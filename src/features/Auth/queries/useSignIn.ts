import { useToast } from "@/shared/hooks";
import auth from "@react-native-firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

type UseSignInParams = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const firebaseAuth = auth();
  const toast = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ password, email }: UseSignInParams) => {
      return firebaseAuth.signInWithEmailAndPassword(email, password);
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
