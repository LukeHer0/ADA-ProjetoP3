import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";

export default function Registro({ navigation }) {
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [senha, setPassword] = React.useState("");
  const [senha2, setPassword2] = React.useState("");
  const [matricula, setId] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.gapContainer}>
          <View style={{ marginTop: "6%" }}>
            <Text style={styles.baseText}>Nome completo</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNome}
              value={nome}
              placeholder="Insira o seu nome completo"
            />
          </View>

          <View>
            <Text style={styles.baseText}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Insira o seu email"
            />
          </View>

          <View>
            <Text style={styles.baseText}>Senha</Text>
            <TextInput
              secureTextEntry
              style={styles.input}
              onChangeText={setPassword}
              value={senha}
              placeholder="Insira sua senha"
            />
          </View>

          <View>
            <Text style={styles.baseText}>Confirmar senha</Text>
            <TextInput
              secureTextEntry
              style={styles.input}
              onChangeText={setPassword2}
              value={senha2}
              placeholder="Confirme sua senha"
            />
          </View>

          <View>
            <Text style={styles.baseText}>Nº de matrícula</Text>
            <TextInput
              style={styles.input}
              onChangeText={setId}
              value={matricula}
              placeholder="Insira o seu nº de matrícula"
            />
          </View>

          <View>
            <Pressable style={styles.buttonStyle} onPress={null}>
              <Text style={{ fontSize: 16 }}>Cadastrar</Text>
            </Pressable>
          </View>
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
    fontWeight: "regular",
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
