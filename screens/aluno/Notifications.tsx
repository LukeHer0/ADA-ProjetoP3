import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

import { Notificacao } from "../../components/Notificacao";

const notificacoes = [
  {
    title: "Aula cancelada",
    desc: "A aula de Circuitos Digitais foi cancelada",
  },
  {
    title: "Aula cancelada",
    desc: "A aula de Circuitos Digitais foi cancelada",
  },
  {
    title: "Aula cancelada",
    desc: "A aula de Circuitos Digitais foi cancelada",
  },
];

export default function Notifications({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View style={{ marginTop: "5%", width: "100%" }}>
          {notificacoes.map((notif, index) => (
            <Notificacao key={index} {...notif} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
