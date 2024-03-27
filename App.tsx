import "react-native-reanimated";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { AppStateStatus, Platform, Text } from "react-native";

import { useAppState } from "./hooks/useAppState";
import { useOnlineManager } from "./hooks/useOnlineManager";
import { StackAppScreens } from "./navigation";
import { RootStackParamList } from "./screens";
import { useAuthStore } from "./stores/authStore";

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

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useOnlineManager();

  useAppState(onAppStateChange);

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
