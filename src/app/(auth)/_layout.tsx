import { useReactQueryConfig } from "@/config/services";
import { useAuth } from "@/features/Auth/provider";
import { MyRecipesProvider } from "@/features/MyRecipes/provider";
import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
  const { initializing, user } = useAuth();

  useReactQueryConfig(user);

  if (initializing) return null;

  if (!user) return <Redirect href="../login" />;

  if (user && !user.emailVerified) return <Redirect href="../verify-email" />;

  return (
    <MyRecipesProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details-recipe" options={{ headerShown: false }} />
      </Stack>
    </MyRecipesProvider>
  );
}
