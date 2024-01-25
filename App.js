import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Pressable, ScrollView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Registro from './screens/Registro';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name = "Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen  name = "Registro" component={Registro} options ={{
            title: 'Cadastro',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold',
            },
            headerShadowVisible: false,
            }}
            />  
        </Stack.Navigator> 
      </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
