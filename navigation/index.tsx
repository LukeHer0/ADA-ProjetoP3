import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import ChangeUserInfo from "../components/ChangeUserInfo";
import MenuHamburger from "../components/MenuHamburger";
import { queryClient } from "../config/query";
import ConfirmarConta from "../screens/ConfirmarConta";
import EmailConfirmacaoEnviado from "../screens/EmailConfirmacaoEnviado";
import EsqueciMinhaSenha from "../screens/EsqueciMinhaSenha";
import Login from "../screens/Login";
import Registro from "../screens/Registro";
import AddMateria from "../screens/aluno/AddMateria";
import HomeAluno from "../screens/aluno/Home";
import ListMateria from "../screens/aluno/ListMaterias";
import Notifications from "../screens/aluno/Notifications";
import HomeProfessor from "../screens/professor/Home";
import ListEstudantes from "../screens/professor/ListStudents";
import HomeSecretaria from "../screens/secretaria/Home";
import { useAuthStore } from "../stores/authStore";

export const Stack = createNativeStackNavigator();

export const StackAppScreens = () => {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) queryClient.clear();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
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
          name="Home"
          options={({ navigation }) => ({
            title:
              user?.role === "secretary"
                ? "Lista de Matérias"
                : "Suas atividades",
            headerBackVisible: false,
            headerShadowVisible: false,

            headerRight: () => (
              <View style={styles.headerIcons}>
                {/* {user?.role === 'secretary' ? null : <TouchableOpacity
                  onPress={() => navigation.navigate("Notifications")}
                >
                  <FeatherIcons name="bell" size={26} />
                </TouchableOpacity>} */}
                <MenuHamburger />
              </View>
            ),
          })}
          component={
            user?.role === "student"
              ? HomeAluno
              : user?.role === "secretary"
                ? HomeSecretaria
                : HomeProfessor
          }
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
                {/* <Pressable>
                <FeatherIcons name="bell" size={28} />
              </Pressable> */}
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

        <Stack.Screen
          name="ListaEstudantes"
          component={ListEstudantes}
          options={{
            title: "Alunos",
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "bold",
            },
            gestureEnabled: true,
            headerShadowVisible: true,
          }}
        />
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
      </Stack.Navigator>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  headerIcons: {
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
