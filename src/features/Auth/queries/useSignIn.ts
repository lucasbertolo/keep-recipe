import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useAuth } from "../provider";

type UseSignInParams = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const auth = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ password, email }: UseSignInParams) => {
      return auth.service.signIn(email, password);
    },
    onSuccess: () => {
      router.replace("/");
    },
  });
};
