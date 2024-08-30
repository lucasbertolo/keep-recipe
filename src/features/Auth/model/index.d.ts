declare namespace Auth {
  interface Actions {
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    registerUser: (username: string, password: string) => Promise<void>;
  }

  interface User {
    uid: string;
    displayName: string | null;
    email: string | null;
  }

  interface Provider {
    service: Auth.Actions;
    user?: Auth.User;
    initializing: boolean;
  }
}
