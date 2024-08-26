import { useToast } from "@/shared/hooks";
import auth from "@react-native-firebase/auth";
import { useMutation } from "@tanstack/react-query";

export const useSignOut = () => {
  const firebaseAuth = auth();
  const toast = useToast();

  return useMutation({
    mutationFn: async () => {
      return firebaseAuth.signOut();
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
