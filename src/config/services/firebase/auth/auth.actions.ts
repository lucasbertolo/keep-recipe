import auth from "@react-native-firebase/auth";
import { formatFirebaseAuthError } from "./helper";

type FirebaseError = Error & {
  code: string;
};

export class FirebaseAuthService implements Auth.Actions {
  async signIn(username: string, password: string): Promise<void> {
    try {
      await auth().signInWithEmailAndPassword(username, password);
    } catch (error) {
      const firebaseError = error as FirebaseError;

      if (firebaseError) {
        throw new Error(formatFirebaseAuthError(firebaseError.code));
      }

      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await auth().signOut();
    } catch (error) {
      const firebaseError = error as FirebaseError;

      if (firebaseError) {
        throw new Error(formatFirebaseAuthError(firebaseError.code));
      }

      throw error;
    }
  }

  async registerUser({
    email,
    password,
    displayName,
  }: Auth.RegisterUser): Promise<void> {
    try {
      const userCredentials = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      await userCredentials.user.updateProfile({ displayName });
    } catch (error) {
      const firebaseError = error as FirebaseError;

      if (firebaseError) {
        throw new Error(formatFirebaseAuthError(firebaseError.code));
      }

      throw error;
    }
  }
}
