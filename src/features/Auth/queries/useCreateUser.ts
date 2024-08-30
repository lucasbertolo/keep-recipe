import { useToast } from "@/shared/hooks";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../provider";
import { useRouter } from "expo-router";

type UseSignInParams = {
  email: string;
  password: string;
};

export const useCreateUser = () => {
  const auth = useAuth();
  const router = useRouter();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({ password, email }: UseSignInParams) => {
      return auth.service.registerUser(email, password);
    },
    onSuccess: () => {
      toast.showToast({
        message: "Usuário criado com sucesso, pronto para fazer o login",
        type: "success",
      });

      router.navigate("/login");
    },
    onError: async (error) => {
      toast.showToast({ message: error.message });

      // if (error.code === "auth/email-already-in-use") {
      //   toast.showToast({ message: "That email address is already in use!" });
      // }
      // if (error.code === "auth/invalid-email") {
      //   console.log("That email address is invalid!");
      //   toast.showToast({ message: "That email address is invalid!" });
      // }
    },
  });
};
