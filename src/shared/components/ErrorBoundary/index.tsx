import { type ErrorBoundaryProps } from "expo-router";
import { View } from "react-native";
import { Typography } from "../Typography";
import Button from "../Button";
import { ErrorSvg } from "@/shared/assets/images/svg";
import { Space } from "../Space";
import { useEffect } from "react";
import { FirebaseCrashlyticsService } from "@/config/services";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  useEffect(() => {
    FirebaseCrashlyticsService.recordError(error);
  }, [error]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ErrorSvg width={64} height={64} />

      <Space type="lg" />
      <Typography>Parece que aconteceu algo errado</Typography>
      <Button onPress={retry}>Tentar novamente?</Button>
    </View>
  );
}
