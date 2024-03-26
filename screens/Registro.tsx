import { zodResolver } from "@hookform/resolvers/zod";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { z } from "zod";

import { RootStackParamList } from ".";
import { Input } from "../components/Input";
import { AppButton } from "../components/ui/AppButton";
import { useAuthStore } from "../stores/authStore";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Insira seu nome."),
    email: z
      .string()
      .email("Insira um e-mail válido.")
      .min(1, "Insira seu e-mail."),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres."),
    confirmPassword: z.string(),
    registration_id: z.string().min(8, "Insira um número de matrícula válido."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais.",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof registerSchema>;

export default function Registro() {
  const { formState, handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const register = useAuthStore((state) => state.register);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      await register(data);
      Alert.alert(
        "Cadastro realizado com sucesso! Siga as instruções presentes no seu email para confirmação",
        undefined,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ],
      );
    } catch {
      Alert.alert(
        "Houve um erro no seu cadastro. Entre em contato com o suporte ou tente novamente",
      );
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.gapContainer}>
          <View style={{ marginTop: "6%" }}>
            <Text style={styles.baseText}>Nome completo</Text>
            <Input
              control={control}
              name="name"
              placeholder="Insira o seu nome completo"
            />
            {formState.errors.name ? (
              <Text style={{ color: "red" }}>
                {formState.errors.name?.message}
              </Text>
            ) : null}
          </View>

          <View>
            <Text style={styles.baseText}>Email</Text>
            <Input
              control={control}
              name="email"
              placeholder="Insira o seu email"
            />

            {formState.errors.email ? (
              <Text style={{ color: "red" }}>
                {formState.errors.email?.message}
              </Text>
            ) : null}
          </View>

          <View>
            <Text style={styles.baseText}>Senha</Text>
            <Input
              secureTextEntry
              name="password"
              placeholder="Insira sua senha"
              control={control}
            />
            {formState.errors.password ? (
              <Text style={{ color: "red" }}>
                {formState.errors.password?.message}
              </Text>
            ) : null}
          </View>

          <View>
            <Text style={styles.baseText}>Confirmar senha</Text>
            <Input
              secureTextEntry
              name="confirmPassword"
              control={control}
              placeholder="Confirme sua senha"
            />
            {formState.errors.confirmPassword ? (
              <Text style={{ color: "red" }}>
                {formState.errors.confirmPassword?.message}
              </Text>
            ) : null}
          </View>

          <View>
            <Text style={styles.baseText}>Nº de matrícula</Text>
            <Input
              name="registration_id"
              control={control}
              placeholder="Insira o seu Nº de matrícula"
            />
            {formState.errors.registration_id ? (
              <Text style={{ color: "red" }}>
                {formState.errors.registration_id?.message}
              </Text>
            ) : null}
          </View>

          <AppButton onPress={onSubmit} loading={formState.isSubmitting}>
            Cadastrar
          </AppButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    color: "red",
  },

  baseText: {
    fontSize: 16,
    //   fontFamily: 'Inter',
    color: "#1f2937",
  },

  baseTextBold: {
    fontSize: 16,
    //   fontFamily: 'Inter',
    color: "#1f2937",
    fontWeight: "bold",
  },

  leftbaseText: {
    fontSize: 16,
    // fontFamily: 'Inter',
    color: "#1f2937",
    alignItems: "flex-end",
  },

  negritobaseText: {
    fontSize: 16,
    fontWeight: "bold",
    // fontFamily: 'Inter',
    color: "#1f2937",
  },

  gapContainer: {
    gap: 12,
    justifyContent: "center",
    maxWidth: "90%",
    marginLeft: "5%",
  },

  titleText: {
    fontSize: 36,
    fontWeight: "bold",
  },

  subTitleText: {
    fontSize: 24,
    fontWeight: "normal",
  },

  buttonStyle: {
    maxWidth: "100%",
    paddingVertical: 10,
    color: "black",
    backgroundColor: "#d1d5db",
    borderRadius: 4,
    alignItems: "center",
    marginTop: "5%",
  },

  titleStyle: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 50,
    marginBottom: 30,
  },

  inputStyle: {
    alignItems: "center",
  },

  inputTitle: {
    flexDirection: "column",
    alignItems: "flex-start",
    color: "d1d5db",
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  input: {
    backgroundColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
