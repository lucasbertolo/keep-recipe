import { useFirebaseSession } from "@/config/services";
import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
  const firebaseSession = useFirebaseSession();

  if (!firebaseSession.initializing && !firebaseSession.user) {
    return <Redirect href="../login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
