import FeatherIcons from "@expo/vector-icons/Feather";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

import ChangeUserInfo from "./components/ChangeUserInfo";
import MenuHamburger from "./components/MenuHamburger";
import { RootStackParamList } from "./screens";
import ConfirmarConta from "./screens/ConfirmarConta";
import EmailConfirmacaoEnviado from "./screens/EmailConfirmacaoEnviado";
import EsqueciMinhaSenha from "./screens/EsqueciMinhaSenha";
import Login from "./screens/Login";
import Registro from "./screens/Registro";
import AddMateria from "./screens/aluno/AddMateria";
import HomeAluno from "./screens/aluno/Home";
import ListMateria from "./screens/aluno/ListMaterias";
import Notifications from "./screens/aluno/Notifications";
import { useAuthStore } from "./stores/authStore";
//import HomeProfessor from "./screens/professor/Home";
// import { useAuthStore } from "./stores/authStore";

type LinkingType = {
  config: {
    screens: {
      [key in keyof Partial<RootStackParamList>]: string;
    };
  };
  prefixes: string[];
};

const config = {
  screens: {
    ConfirmarConta: "confirmar-conta",
  },
};

const linking: LinkingType = {
  prefixes: [Linking.createURL("/")],
  config,
};

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const verifyAuth = useAuthStore((state) => state.verifyAuth);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    async function prepare() {
      try {
        await verifyAuth();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer
      onReady={onLayoutRootView}
      linking={linking}
      fallback={<Text>Loading...</Text>}
    >
      <Stack.Navigator
        initialRouteName={user ? "Home" : "Login"}
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
          name="EmailConfirmacaoEnviado"
          component={EmailConfirmacaoEnviado}
          options={{
            title: "Email enviado",
            headerTitleAlign: "center",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="ConfirmarConta"
          component={ConfirmarConta}
          options={{
            title: "Confirmar Conta",
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
          component={HomeAluno}
          options={({ navigation }) => ({
            title: "Suas atividades",
            headerBackVisible: false,
            headerShadowVisible: false,

            headerRight: () => (
              <View style={styles.headerIcons}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Notifications")}
                >
                  <FeatherIcons name="bell" size={26} />
                </TouchableOpacity>
                <MenuHamburger />
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
              fontWeight: "bold",
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
              fontWeight: "bold",
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
              fontWeight: "bold",
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
