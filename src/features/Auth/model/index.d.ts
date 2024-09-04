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
    sendEmailVerification: () => Promise<void>;
  }

  interface User {
    uid: string;
    displayName: string | null;
    email: string | null;
    emailVerified?: boolean;
  }

  interface Provider {
    service: Auth.Actions;
    user?: Auth.User | null;
    initializing: boolean;
    reloadUser: () => Promise<void>;
  }
}
