import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View, SafeAreaView, Pressable, Alert } from "react-native";
import { z } from "zod";

import { Input } from "./Input";
import { AppButton } from "./ui/AppButton";
import { useAuthStore } from "../stores/authStore";

const validationSchema = z.object({
  name: z.string().min(1, "Insira seu nome."),
  email: z
    .string()
    .email("Insira um e-mail válido.")
    .min(1, "Insira seu e-mail."),

  registration_id: z.string().min(8, "Insira um número de matrícula válido."),
});

type FormData = z.infer<typeof validationSchema>;

export default function ChangeUserInfo() {
  const user = useAuthStore((state) => state.user);

  const updateProfile = useAuthStore((state) => state.updateProfile);

  const { control, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      //registration_id: user?.registration_id,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateProfile(data);
      Alert.alert("Sucesso", "Perfil atualizado com sucesso.");
    } catch {
      Alert.alert("Erro", "Erro ao atualizar perfil.");
    }
  });

  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <View style={{ paddingHorizontal: 30 }}>
        <View style={{ gap: 20 }}>
          <View>
            <Text>Nome</Text>
            <Input
              control={control}
              name="name"
              placeholder="Insira o seu nome"
            />

            {formState.errors.name ? (
              <Text style={{ color: "red" }}>
                {formState.errors.name?.message}
              </Text>
            ) : null}
          </View>

          <View>
            <Text>Email</Text>
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

          {/* <View>
            <Text>N° da Matrícula</Text>
            <Input
              control={control}
              name="registration_id"
              placeholder="Insira o seu nº de matricula"
            />

            {formState.errors.registration_id ? (
              <Text style={{ color: "red" }}>
                {formState.errors.registration_id?.message}
              </Text>
            ) : null}
          </View> */}
        </View>

        <View style={{ paddingTop: 32 }}>
          <AppButton onPress={onSubmit} loading={formState.isSubmitting}>
            Salvar alterações
          </AppButton>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          <Pressable hitSlop={24} onPress={() => {}}>
            <Text>Alterar minha senha</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
