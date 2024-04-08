import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { uiActions } from "@/store/reducers/ui.reducer";
import { createContext, useContext, useEffect } from "react";
import { EThemeType } from "@/modules/@shared/enums/theme.enum";
import { TooltipProvider } from "@/_shad/components/ui/tooltip";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: EThemeType;
};

type ThemeProviderState = {
  theme: EThemeType;
  setTheme: (theme: EThemeType) => void;
  getSystemTheme: () => EThemeType.dark | EThemeType.light;
};

const initialState: ThemeProviderState = {
  theme: EThemeType.system,
  setTheme: () => null,
  getSystemTheme: () => EThemeType.dark,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = EThemeType.dark,
  ...props
}: ThemeProviderProps) {
  const { theme } = useSelector((state: RootState) => state.ui);

  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? EThemeType.dark
      : EThemeType.light;
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(EThemeType.light, EThemeType.dark);

    if (theme === "system") {
      const systemTheme = getSystemTheme();
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    getSystemTheme,
    setTheme: (theme: EThemeType) => {
      uiActions.setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
