import React from "react";
import { Text, View } from "react-native";

type ToastProps = {
  message: string;
};

export const Toast = ({ message }: ToastProps) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 50,
        left: 50,
        right: 50,
        backgroundColor: "black",
        padding: 10,
        borderRadius: 5,
      }}
    >
      <Text style={{ color: "white", textAlign: "center" }}>{message}</Text>
    </View>
  );
};
