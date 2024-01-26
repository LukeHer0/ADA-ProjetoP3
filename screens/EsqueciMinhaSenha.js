import { StatusBar } from "expo-status-bar";
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";

export default function EsqueciMinhaSenha() {
  const [email, onChangeEmail] = React.useState("");

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
            <TextInput
              style={styles.input}
              onChangeText={onChangeEmail}
              value={email}
              placeholder="Insira o seu email"
            />
          </View>

          <View>
            <Pressable style={styles.buttonStyle} onPress={null}>
              <Text style={{ fontSize: 16 }}>Recuperar senha</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <View>
        <StatusBar style="auto" />
      </View>
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
