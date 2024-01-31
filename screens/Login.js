import { useAtom } from "jotai";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";

import { userTypeAtom } from "../utils/states";

export default function Login({ navigation }) {
  const [login, onChangeLogin] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [_, setUserType] = useAtom(userTypeAtom);

  const handleSubmit = () => {
    const loginValue = login.toLowerCase().trim();

    if (loginValue !== "aluno" && loginValue !== "professor")
      return Alert.alert(
        "Usuário não encontrado",
        "Verifique as credenciais e tente novamente. Caso o erro persista, entre em contato com a secretaria.",
      );

    if (loginValue === "aluno") {
      setUserType("aluno");
    }
    if (loginValue === "professor") setUserType("professor");

    navigation.navigate("Home");
  };

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
            <TextInput
              style={styles.input}
              onChangeText={onChangeLogin}
              value={login}
              placeholder="Insira o seu e-mail institucional"
            />
            <Text style={styles.baseText}>Senha</Text>
            <TextInput
              secureTextEntry
              style={styles.input}
              onChangeText={onChangePassword}
              value={password}
              placeholder="Insira sua senha"
            />
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
          <Pressable style={styles.buttonStyle} onPress={handleSubmit}>
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
    fontWeight: "regular",
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
    //alignItems: 'center',
    //justifyContent: 'center',
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
