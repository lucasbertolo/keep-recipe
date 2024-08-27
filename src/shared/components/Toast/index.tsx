import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";

type ToastProps = {
  message: string;
  type: "success" | "error";
};

export const Toast = ({ message, type }: ToastProps) => {
  const theme = useTheme();
  return (
    <View
      style={{
        position: "absolute",
        bottom: 10,
        left: 20,
        right: 20,
        backgroundColor:
          type === "success" ? theme.colors.primary : theme.colors.error,
        padding: 10,
        borderRadius: 5,
      }}
    >
      <Text
        style={{
          color:
            type === "success" ? theme.colors.onPrimary : theme.colors.onError,
          textAlign: "center",
        }}
      >
        {message}
      </Text>
    </View>
  );
};
