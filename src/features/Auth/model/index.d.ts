declare namespace Auth {
  interface RegisterUser {
    displayName: string;
    email: string;
    password: string;
  }
  interface Actions {
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    registerUser: (props: RegisterUser) => Promise<void>;
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
