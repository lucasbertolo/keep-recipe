import useReactQueryConfig from "@/config/apiConfig";
import { useAuth } from "@/features/Auth/provider";
import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
  const { session } = useAuth();

  useReactQueryConfig();

  if (!session.initializing && !session.user) {
    return <Redirect href="../login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
