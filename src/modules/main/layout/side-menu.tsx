import { useContext } from "react";
import Logo from "@/assets/logo.svg";
import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/_shad/components/ui/button";
import { AuthContext } from "@/contexts/auth.context";
import Each from "@/modules/@shared/components/utils/each";
import { MAIN_MENU_ITEMS } from "../constants/menu.constant";
import { ToggleTheme } from "@/modules/@shared/components/toggle-theme";
import { Sheet, SheetContent, SheetTrigger } from "@/_shad/components/ui/sheet";

export default function AppSideMenu() {
  const navigate = useNavigate();
  const { signOut } = useContext(AuthContext);

  return (
    <Sheet>
      <nav className="w-full flex items-center justify-between desktop:hidden">
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="sm:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
      </nav>

      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="flex flex-col gap-8 font-medium h-full">
          <img src={Logo} alt="D" className="h-14 w-14" />

          <section className="grid grid-cols-2 gap-4">
            <Each
              data={MAIN_MENU_ITEMS}
              render={(item) => (
                <SheetTrigger asChild>
                  <a
                    onClick={() => navigate(item.url)}
                    className="flex flex-col items-center gap-2 p-4 text-muted-foreground text-sm border rounded-md"
                  >
                    <item.icon className="h-5 w-5 transition-all group-hover:scale-110" />
                    {item.title}
                  </a>
                </SheetTrigger>
              )}
            />
          </section>

          <ToggleTheme className="w-full " />

          <a
            onClick={signOut}
            className="mt-auto flex items-center justify-center gap-4 p-2.5 text-red-400"
          >
            <LogOut className="h-5 w-5" />
            Sair
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
