import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
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
import { api } from "../config/api";
import { useAuthStore } from "../stores/authStore";

const validationSchema = z.object({
  email: z.string().email("Insira um e-mail válido."),
  password: z
    .string({
      invalid_type_error: "Insira uma senha válida.",
    })
    .min(1, "Insira sua senha."),
});

type FormData = z.infer<typeof validationSchema>;

export default function Login({ navigation }) {
  const { control, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const saveToken = useAuthStore((state) => state.saveToken);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await api.post<{
        refresh: string;
        access: string;
        is_student: boolean;
        is_teacher: boolean;
        is_secretary: boolean;
      }>("/token/", data);

      saveToken(response.data.access);

      navigation.navigate("Home");
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
        <View style={styles.inputStyle}>
          <View style={{ width: "90%", maxWidth: 400 }}>
            <Text style={styles.baseText}>Email</Text>
            <Input
              name="email"
              control={control}
              style={styles.input}
              placeholder="Insira o seu e-mail institucional"
            />
            <Text style={{ color: "red" }}>
              {formState.errors.email?.message}
            </Text>
            <Text style={styles.baseText}>Senha</Text>
            <Input
              name="password"
              control={control}
              secureTextEntry
              style={styles.input}
              placeholder="Insira sua senha"
            />
            <Text style={{ color: "red" }}>
              {formState.errors.password?.message}
            </Text>
          </View>
          <View style={{ width: "90%", maxWidth: 400 }}>
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
        </View>

        <View>
          <Pressable style={styles.buttonStyle} onPress={onSubmit}>
            <Text style={{ fontSize: 18 }}>Entrar</Text>
          </Pressable>
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

  inputStyle: {
    alignItems: "center",
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
