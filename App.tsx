import 'react-native-reanimated'
import 'react-native-gesture-handler'
import FeatherIcons from "@expo/vector-icons/Feather";
import { NavigationContainer } from "@react-navigation/native";

import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
} from "react-native";

import { RootStackParamList } from "./screens";


import { useAuthStore } from "./stores/authStore";

import { StackAppScreens } from './navigation';

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



export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const verifyAuth = useAuthStore((state) => state.verifyAuth);

 

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
        <StackAppScreens />
    </NavigationContainer>
   
  );
}

