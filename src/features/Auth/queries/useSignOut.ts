import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../provider";

export const useSignOut = () => {
  const auth = useAuth();

  return useMutation({
    mutationFn: async () => {
      await auth.service.signOut();
    },
  });
};
