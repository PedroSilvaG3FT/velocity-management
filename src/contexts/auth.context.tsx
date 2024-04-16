import { RootState } from "../store";
import { useSelector } from "react-redux";
import React, { createContext } from "react";
import { authActions } from "../store/reducers/auth.reducer";
import { IUser } from "../modules/@shared/interfaces/user.interface";
import { UserService } from "@/modules/@shared/services/user.service";
import { DatabaseModel } from "@/modules/@shared/models/database.model";

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
  const { user, firebaseToken } = useSelector((state: RootState) => state.auth);

  const signOut = () => {
    authActions.reset();
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await userService.signIn({
        email,
        password,
      });

      const { refreshToken, accessToken, data } = response.user;

      authActions.setFirebaseToken(accessToken);
      authActions.setFirebaseRefreshToken(refreshToken);
      authActions.setUser(databaseModel.user.buildItem(data));
    } catch (error) {
      throw error;
    }
  };

  const providerValue: IAuthContext = {
    user,
    signIn,
    signOut,
    firebaseToken,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
