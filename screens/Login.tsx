import { zodResolver } from "@hookform/resolvers/zod";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { z } from "zod";

import { Input } from "../components/Input";
import { AppButton } from "../components/ui/AppButton";
import { RootStackParamList } from "../screens";
import { useAuthStore } from "../stores/authStore";

const validationSchema = z.object({
  email: z
    .string()
    .email("Insira um e-mail válido.")
    .min(1, "Insira seu e-mail."),
  password: z
    .string({
      invalid_type_error: "Insira uma senha válida.",
    })
    .min(1, "Insira sua senha."),
});

type FormData = z.infer<typeof validationSchema>;

export default function Login() {
  const { control, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const login = useAuthStore((state) => state.login);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const loginresponse = await login(data);
      if (loginresponse.data.is_secretary) {
        navigation.navigate("HomeSecretaria");
      } else if (loginresponse.data.is_student) {
        navigation.navigate("HomeAluno");
      } else if (loginresponse.data.is_student) {
        navigation.navigate("HomeProfessor");
      }
    } catch (e) {
      Alert.alert("Erro", "E-mail ou senha inválidos.");
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.titleStyle}>
          <Text style={styles.subTitleText}>Bem-vindo ao</Text>
          <Text style={styles.titleText}>ADA</Text>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <View style={{ width: "100%" }}>
            <Text style={styles.baseText}>Email</Text>
            <Input
              name="email"
              control={control}
              style={styles.input}
              placeholder="Insira o seu e-mail institucional"
            />
            {formState.errors.email ? (
              <Text style={{ color: "red" }}>
                {formState.errors.email?.message}
              </Text>
            ) : null}
            <Text style={styles.baseText}>Senha</Text>
            <Input
              name="password"
              control={control}
              secureTextEntry
              style={styles.input}
              placeholder="Insira sua senha"
            />
            {formState.errors.password ? (
              <Text style={{ color: "red" }}>
                {formState.errors.password?.message}
              </Text>
            ) : null}
          </View>
          <View style={{ width: "100%" }}>
            <View
              style={{
                alignItems: "flex-end",
                marginTop: 20,
                marginBottom: 30,
              }}
            >
              <Pressable
                hitSlop={24}
                onPress={() => navigation.navigate("EsqueciMinhaSenha")}
              >
                <Text style={styles.baseText}>Esqueci minha senha</Text>
              </Pressable>
            </View>
          </View>

          <AppButton loading={formState.isSubmitting} onPress={onSubmit}>
            Entrar
          </AppButton>
        </View>
      </ScrollView>

      <View style={{ marginBottom: 40, alignItems: "center" }}>
        <Text style={styles.baseText}>Ainda não possui uma conta?</Text>
        <Pressable hitSlop={24} onPress={() => navigation.navigate("Registro")}>
          <Text style={(styles.baseText, { fontWeight: "bold" })}>
            Registre-se
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontSize: 16,
    color: "#1f2937",
  },

  leftbaseText: {
    fontSize: 16,
    color: "#1f2937",
    alignItems: "flex-end",
  },

  titleText: {
    fontSize: 50,
    fontWeight: "bold",
  },

  subTitleText: {
    fontSize: 24,
  },

  buttonStyle: {
    maxWidth: 400,
    width: "90%",
    paddingVertical: 12,
    color: "black",
    backgroundColor: "#d1d5db",
    borderWidth: 0,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },

  container: {
    flex: 1,
    backgroundColor: "white",
  },

  titleStyle: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 60,
    marginBottom: 30,
  },

  inputTitle: {
    flexDirection: "column",
    alignItems: "flex-start",
    color: "d1d5db",
  },

  input: {
    backgroundColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 4,
    paddingVertical: 6,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
