import { createStore } from "./_base.store";
import { EThemeType } from "@/modules/@shared/enums/theme.enum";

interface State {
  theme: EThemeType;
  setTheme: (theme: EThemeType) => void;
}

export default createStore<State>({
  name: "ui",
  state: (set) => ({
    theme: EThemeType.dark,
    setTheme: (theme) => set({ theme }),
  }),
});
