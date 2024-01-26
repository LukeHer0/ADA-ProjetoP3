import FeatherIcons from "@expo/vector-icons/Feather";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

import EsqueciMinhaSenha from "./screens/EsqueciMinhaSenha";
import Login from "./screens/Login";
import Registro from "./screens/Registro";
import HomeAluno from "./screens/aluno/Home";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeAluno">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registro"
          component={Registro}
          options={{
            title: "Cadastro",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: "bold",
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="EsqueciMinhaSenha"
          component={EsqueciMinhaSenha}
          options={{
            title: "Esqueci minha senha",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: "bold",
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="HomeAluno"
          component={HomeAluno}
          options={{
            title: "Suas atividades",
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: "semi-bold",
            },
            headerShadowVisible: false,
            headerRight: () => (
              <View
                style={{ gap: 20, flexDirection: "row", alignItems: "center" }}
              >
                <Pressable>
                  <FeatherIcons name="bell" size={28} />
                </Pressable>
                <Pressable>
                  <FeatherIcons name="menu" size={28} />
                </Pressable>
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
