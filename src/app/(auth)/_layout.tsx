import useReactQueryConfig from "@/config/apiConfig";
import { useAuth } from "@/features/Auth/provider";
import { MyRecipesProvider } from "@/features/MyRecipes/provider";
import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
  const { initializing, user } = useAuth();

  useReactQueryConfig();

  if (initializing) return null;

  if (!user) return <Redirect href="../login" />;

  return (
    <MyRecipesProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details-recipe" options={{ headerShown: false }} />
      </Stack>
    </MyRecipesProvider>
  );
}
