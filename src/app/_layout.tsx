import { useFirebaseSession } from "@/config/services";
import { Colors } from "@/shared/constants/Colors";
import { useLocalTheme } from "@/shared/hooks";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import merge from "deepmerge";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from "react-native-paper";
import "react-native-reanimated";
import { RootSiblingParent } from "react-native-root-siblings";

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme = { ...MD3LightTheme, colors: Colors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

export const unstable_settings = {
  initialRouteName: "login",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const firebaseSession = useFirebaseSession();
  const { colorScheme } = useLocalTheme();

  const paperTheme =
    colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;

  const queryClient = new QueryClient();

  const [loaded] = useFonts({
    SpaceMono: require("../shared/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded && !firebaseSession.initializing) {
      SplashScreen.hideAsync();
    }
  }, [loaded, firebaseSession.initializing]);

  if (!loaded || firebaseSession.initializing) {
    return null;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme}>
        <QueryClientProvider client={queryClient}>
          <RootSiblingParent>
            <Slot />
          </RootSiblingParent>
        </QueryClientProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}
