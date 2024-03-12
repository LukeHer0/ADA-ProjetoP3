import { zodResolver } from "@hookform/resolvers/zod";
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

import { Input } from "../components/Input";
import { AppButton } from "../components/ui/AppButton";
import { api } from "../config/api";

const validationSchema = z.object({
  email: z
    .string()
    .email("Insira um e-mail válido.")
    .min(1, "Insira seu e-mail."),
});

type FormData = z.infer<typeof validationSchema>;

export default function EsqueciMinhaSenha() {
  const { control, formState, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await api.post("/password_reset", {
        email: values.email.trim().toLowerCase(),
      });

      Alert.alert(
        "Email enviado",
        "Verifique sua caixa de entrada para redefinir sua senha",
      );
    } catch (e) {
      console.log("Erro ao enviar email", e);
      Alert.alert("Erro ao enviar email", JSON.stringify(e));
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.gapContainer}>
          <View style={{ marginTop: "6%" }}>
            <Text style={styles.baseText}>
              Insira seu email para enviar as instruções de recuperação de senha
            </Text>
          </View>

          <View>
            <Text style={styles.baseText}>Email</Text>

            <Input
              name="email"
              control={control}
              placeholder="Insira o seu email"
            />
            {formState.errors.email ? (
              <Text style={{ color: "red" }}>
                {formState.errors.email?.message}
              </Text>
            ) : null}
          </View>

          <AppButton loading={formState.isSubmitting} onPress={onSubmit}>
            Recuperar senha
          </AppButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontSize: 16,
    //   fontFamily: 'Inter',
    color: "#1f2937",
  },

  gapContainer: {
    gap: 12,
    justifyContent: "center",
    maxWidth: "90%",
    marginLeft: "5%",
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

  container: {
    flex: 1,
    backgroundColor: "white",
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
