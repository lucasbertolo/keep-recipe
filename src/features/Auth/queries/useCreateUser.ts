import { useToast } from "@/shared/hooks";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../provider";
import { useRouter } from "expo-router";

export const useCreateUser = () => {
  const auth = useAuth();
  const router = useRouter();
  const toast = useToast();

  return useMutation({
    mutationFn: auth.service.registerUser,
    onSuccess: () => {
      toast.showToast({
        message: "Usuário criado com sucesso, pronto para fazer o login",
        type: "success",
      });

      router.navigate("/login");
    },
  });
};
