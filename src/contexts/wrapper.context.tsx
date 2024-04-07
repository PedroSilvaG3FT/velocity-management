import store from "@/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import React, { createContext } from "react";
import { AuthProvider } from "./auth.context";
import { ThemeProvider } from "./theme.context";
import { PersistGate } from "redux-persist/integration/react";
import SplashLoading from "@/modules/@shared/components/splash-loading";

interface IWrapperProviderProps {
  children: React.ReactNode;
}

const WrapperContext = createContext({});

const WrapperProvider: React.FC<IWrapperProviderProps> = ({ children }) => {
  return (
    <WrapperContext.Provider value={{}}>
      <Provider store={store}>
        <PersistGate
          loading={<SplashLoading />}
          persistor={persistStore(store)}
        >
          <ThemeProvider>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </WrapperContext.Provider>
  );
};

export { WrapperContext, WrapperProvider };
