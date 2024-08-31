import React from "react";
import RootSiblings from "react-native-root-siblings";
import { Toast } from "../components";

type ShowToast = {
  message: string;
  type?: "error" | "success";
  onPress?: { label: string; action: () => void };
  time?: number;
};

export const useToast = () => {
  let toast: RootSiblings;

  const showToast = ({ message, type = "error", onPress, time }: ShowToast) => {
    toast = new RootSiblings(
      (
        <Toast
          message={message}
          type={type}
          onClose={() => toast.destroy()}
          onPress={onPress}
        />
      ),
    );

    setTimeout(() => {
      toast.destroy();
    }, time ?? 5000);
  };

  return { showToast };
};
