import React from "react";
import RootSiblings from "react-native-root-siblings";
import { Toast } from "../components";

type ShowToast = {
  message: string;
  type?: "error" | "success";
};

export const useToast = () => {
  let toast: RootSiblings;

  const showToast = ({ message, type = "error" }: ShowToast) => {
    toast = new RootSiblings(<Toast message={message} type={type} />);

    setTimeout(() => {
      toast.destroy();
    }, 5000);
  };

  return { showToast };
};
