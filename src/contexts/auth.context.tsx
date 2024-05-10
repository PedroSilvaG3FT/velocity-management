import authStore from "@/store/auth.store";
import React, { createContext } from "react";
import loadingStore from "@/store/loading.store";
import { UserService } from "@/modules/@shared/services/user.service";

interface IAuthContext {
  signOut: () => void;
  signIn: (email: string, password: string) => Promise<void>;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  signOut: () => {},
  signIn: () => new Promise<void>(() => {}),
});

const userService = new UserService();

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const _authStore = authStore((state) => state);
  const _loadingStore = loadingStore((state) => state);

  const signOut = () => {
    _authStore.reset();
  };

  const signIn = async (email: string, password: string) => {
    try {
      _loadingStore.setShow(true);

      const response = await userService.signIn({ email, password });
      const { token, user } = response;

      _authStore.setUser(user);
      _authStore.setToken(token);

      _loadingStore.setShow(false);
    } catch (error) {
      _loadingStore.setShow(false);
      throw error;
    }
  };

  const providerValue: IAuthContext = {
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
