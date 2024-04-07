import { useEffect } from "react";
import LogoImage from "@/assets/react.svg";
import { EThemeType } from "../enums/theme.enum";
import { useTheme } from "@/contexts/theme.context";

export default function SplashLoading() {
  const { getSystemTheme } = useTheme();

  useEffect(() => {
    try {
      const state = JSON.parse(localStorage.getItem("persist:root") || "");
      const uiState = JSON.parse(state.ui || "");

      const root = window.document.documentElement;
      root.classList.remove(EThemeType.light, EThemeType.dark);

      root.classList.add(uiState?.theme || getSystemTheme());
    } catch (error) {
      console.warn("[SplashLoading]: failed on initiliazing theme");
    }
  }, []);

  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center">
      <img
        alt="LOGO"
        src={LogoImage}
        className="mb-4 h-32 object-contain animate__animated animate__heartBeat animate__infinite"
      />
      <h2>Loading app </h2>
    </section>
  );
}
