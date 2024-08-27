export interface AuthApiInterface {
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  registerUser: (username: string, password: string) => Promise<void>;
}
