import React from "react";
import RootSiblings from "react-native-root-siblings";
import { Toast } from "../components";

type ShowToast = {
  message: string;
  type?: "error" | "success";
};

export const useToast = () => {
  let toast: RootSiblings;

  const showToast = ({ message }: ShowToast) => {
    toast = new RootSiblings(<Toast message={message} />);

    setTimeout(() => {
      toast.destroy();
    }, 2000);
  };

  return { showToast };
};
