import { useAuth } from "@/features/Auth/provider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export const useSignOut = () => {
  const auth = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: auth.service.signOut,
    onSuccess: () => {
      router.replace("/login");
    },
  });
};
