import React, { createContext } from "react";
import { AuthProvider } from "./auth.context";
import { ThemeProvider } from "./theme.context";

interface IWrapperProviderProps {
  children: React.ReactNode;
}

const WrapperContext = createContext({});

const WrapperProvider: React.FC<IWrapperProviderProps> = ({ children }) => {
  return (
    <WrapperContext.Provider value={{}}>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </WrapperContext.Provider>
  );
};

export { WrapperContext, WrapperProvider };
