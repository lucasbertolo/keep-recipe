import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect, useState } from "react";

export const useFirebaseSession = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((newUser) => {
      if (newUser) setUser(newUser);
      if (initializing) setInitializing(false);
    });

    return subscriber;
  }, [initializing]);

  return { user, initializing };
};
