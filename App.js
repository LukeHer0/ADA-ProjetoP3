import FeatherIcons from "@expo/vector-icons/Feather";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { View, Pressable, StyleSheet, TouchableOpacity } from "react-native";

import ChangeUserInfo from "./components/ChangeUserInfo";
import MenuHamburger from "./components/MenuHamburger";
import EsqueciMinhaSenha from "./screens/EsqueciMinhaSenha";
import Login from "./screens/Login";
import Registro from "./screens/Registro";
import AddMateria from "./screens/aluno/AddMateria";
import HomeAluno from "./screens/aluno/Home";
import ListMateria from "./screens/aluno/ListMaterias";
import HomeProfessor from "./screens/professor/Home";
import HomeSecretaria from "./screens/secretaria/Home";
import { userTypeAtom } from "./utils/states";
import Notifications from "./screens/aluno/Notifications";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [userType] = useAtom(userTypeAtom);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleStyle: {
            fontSize: 26,

            fontWeight: "bold",
          },
        }}
      >
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
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="EsqueciMinhaSenha"
          component={EsqueciMinhaSenha}
          options={{
            title: "Esqueci minha senha",
            headerTitleAlign: "center",

            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="Home"
          component={
            userType === "aluno"
              ? HomeAluno
              : userType === "professor"
                ? HomeProfessor
                : HomeSecretaria
          }
          options={({ navigation }) => ({
            title: "Suas atividades",
            headerBackVisible: false,
            headerShadowVisible: false,

            headerRight: () => (
              <View style={styles.headerIcons}>
                <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
                  <FeatherIcons name="bell" size={26} />
                </TouchableOpacity>
                <MenuHamburger navigation={navigation} />
                {/* <Pressable>
                  <FeatherIcons name="menu" size={28} />
                </Pressable> */}
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            headerBackVisible: true,
            title: "Notificações",
            headerTitleAlign: "center",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="addMateria"
          component={AddMateria}
          options={{
            title: "Adicionar Matéria",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: "semi-bold",
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="ListMateria"
          component={ListMateria}
          options={() => ({
            title: "Suas matérias",
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: "semi-bold",
            },
            headerBackVisible: false,
            headerShadowVisible: false,
            headerRight: () => (
              <View style={styles.headerIcons}>
                <Pressable>
                  <FeatherIcons name="bell" size={28} />
                </Pressable>
                <MenuHamburger />
                {/* <Pressable>
                  <FeatherIcons name="menu" size={28} />
                </Pressable> */}
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ChangeUserInfo"
          component={ChangeUserInfo}
          options={{
            title: "Editar usuário",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: "semi-bold",
            },
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerIcons: {
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
