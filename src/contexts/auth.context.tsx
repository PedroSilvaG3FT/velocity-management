import authStore from "@/store/auth.store";
import React, { createContext } from "react";
import loadingStore from "@/store/loading.store";
import { IUser } from "../modules/@shared/interfaces/user.interface";
import { UserService } from "@/modules/@shared/firebase/services/user.service";
import { DatabaseModel } from "@/modules/@shared/firebase/models/database.model";

interface IAuthContext {
  user: IUser;
  signOut: () => void;
  firebaseToken: string;
  signIn: (email: string, password: string) => Promise<void>;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  firebaseToken: "",
  user: {} as IUser,
  signOut: () => {},
  signIn: () => new Promise<void>(() => {}),
});

const userService = new UserService();
const databaseModel = new DatabaseModel();

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const _authStore = authStore((state) => state);
  const _loadingStore = loadingStore((state) => state);

  const signOut = () => {
    _authStore.reset();
  };

  const signIn = async (email: string, password: string) => {
    try {
      _loadingStore.setShow(true);

      const response = await userService.signIn({
        email,
        password,
      });

      const { refreshToken, accessToken, data } = response.user;

      _authStore.setFirebaseToken(accessToken);
      _authStore.setFirebaseRefreshToken(refreshToken);
      _authStore.setUser(databaseModel.user.buildItem(data));

      _loadingStore.setShow(false);
    } catch (error) {
      _loadingStore.setShow(false);
      throw error;
    }
  };

  const providerValue: IAuthContext = {
    user: _authStore.user,
    signIn,
    signOut,
    firebaseToken: _authStore.firebaseToken,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
