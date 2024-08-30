import auth from "@react-native-firebase/auth";

export class FirebaseAuthService implements Auth.Actions {
  async signIn(username: string, password: string): Promise<void> {
    try {
      await auth().signInWithEmailAndPassword(username, password);
    } catch (error) {
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await auth().signOut();
    } catch (error) {
      throw error;
    }
  }

  async registerUser(username: string, password: string): Promise<void> {
    try {
      await auth().createUserWithEmailAndPassword(username, password);
    } catch (error) {
      throw error;
    }
  }
}
