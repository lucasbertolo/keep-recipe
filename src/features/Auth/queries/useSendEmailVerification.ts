import { useToast } from "@/shared/hooks";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../provider";

export const useSendEmailVerification = () => {
  const auth = useAuth();
  const toast = useToast();

  return useMutation({
    mutationFn: auth.service.sendEmailVerification,
    onSuccess: () => {
      toast.showToast({
        type: "success",
        message: "Email enviado com sucesso",
      });
    },
  });
};
