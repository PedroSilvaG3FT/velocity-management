import { WrapperProvider } from "./contexts/wrapper.context";
import { ToggleTheme } from "./modules/@shared/components/toggle-theme";

function App() {
  return (
    <WrapperProvider>
      <ToggleTheme />
      <h1>Hello World</h1>
    </WrapperProvider>
  );
}

export default App;
