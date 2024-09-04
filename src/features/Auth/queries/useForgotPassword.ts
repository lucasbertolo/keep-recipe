import { useToast } from "@/shared/hooks";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../provider";
import { useRouter } from "expo-router";

export const useForgotPassword = () => {
  const auth = useAuth();
  const toast = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async (email: string) => {
      await auth.service.resetPassword(email);
    },
    onSuccess: () => {
      router.back();

      toast.showToast({
        type: "success",
        message: "Email enviado com sucesso",
      });
    },
  });
};
