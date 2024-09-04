import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect, useState } from "react";

export const useFirebaseSession = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  const reloadUser = async () => {
    const currentUser = auth().currentUser;

    if (!currentUser) return;

    await currentUser.reload();

    const newUser = auth().currentUser;

    if (!newUser) return;

    setUser(newUser);
  };

  const checkAuthStatus = async () => {
    const currentUser = auth().currentUser;

    if (currentUser) setUser(currentUser);

    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    checkAuthStatus();

    const subscriber = auth().onAuthStateChanged((newUser) => {
      setUser(newUser);
      if (initializing) setInitializing(false);
    });

    return subscriber;
  }, [initializing, user]);

  return { user, initializing, reloadUser };
};
