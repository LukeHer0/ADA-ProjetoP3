import FeatherIcons from "@expo/vector-icons/Feather";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Pressable,
} from "react-native";

export default function ChangeUserInfo() {
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [id, setID] = React.useState("");

  return (
    <SafeAreaView style={{ backgroundColor: "#e5e7eb" }}>
      <View style={{ backgroundColor: "white", marginTop: "25%" }}>
        <View style={{ width: "90%", maxWidth: 400 }}>
          <Text style={styles.baseText}>Nome</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNome}
            value={nome}
            placeholder="Insira o seu nome"
          />
          <Text style={styles.baseText}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Insira o seu e-mail"
          />
          <Text style={styles.baseText}>N° da Matrícula</Text>
          <TextInput
            style={styles.input}
            onChangeText={setID}
            value={id}
            placeholder="Insira sua matrícula"
          />
        </View>
        <View
          style={{
            alignItems: "flex-end",
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          <Pressable hitSlop={24} onPress={() => {}}>
            <Text style={styles.baseText}>Alterar minha senha</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
