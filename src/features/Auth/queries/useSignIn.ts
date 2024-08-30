import { useToast } from "@/shared/hooks";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useAuth } from "../provider";

type UseSignInParams = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const auth = useAuth();
  const toast = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ password, email }: UseSignInParams) => {
      return auth.service.signIn(email, password);
    },
    onSuccess: () => {
      router.replace("/");
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
