import React, { createContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { authActions } from "../store/reducers/auth.reducer";
import { IUser } from "../modules/@shared/interfaces/user.interface";

interface IAuthContext {
  user: IUser;
  token: string;
  signOut: () => void;
  signIn: () => Promise<void>;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  token: "",
  user: {} as IUser,
  signOut: () => {},
  signIn: () => new Promise<void>(() => {}),
});

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  const signOut = () => authActions.reset();
  const signIn = async () => {};

  const providerValue: IAuthContext = {
    user,
    token,
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
