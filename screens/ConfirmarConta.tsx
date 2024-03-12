import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";

import { RootStackParamList } from ".";

export default function ConfirmarConta() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const goBack = () => {
    return navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.gapContainer}>
          <View style={{ marginTop: "6%" }}>
            <Text style={styles.baseText}>
              Confirmamos sua conta com sucesso! Agora você pode fazer login.
            </Text>
          </View>

          <View>
            <Pressable style={styles.buttonStyle} onPress={goBack}>
              <Text style={{ fontSize: 16 }}>Ir para o login</Text>
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
