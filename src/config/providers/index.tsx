import { CombinedDarkTheme, CombinedLightTheme } from "@/config/services";
import { AuthProvider } from "@/features/Auth/provider";
import { useLocalTheme } from "@/shared/hooks";
import { ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { RootSiblingParent } from "react-native-root-siblings";

export const Providers = ({ children }: React.PropsWithChildren) => {
  const { colorScheme } = useLocalTheme();

  const queryClient = new QueryClient();

  const paperTheme =
    colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <RootSiblingParent>{children}</RootSiblingParent>
            </GestureHandlerRootView>
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </PaperProvider>
  );
};
