import { useContext } from "react";
import Logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";
import { PanelLeft, LogOut } from "lucide-react";
import { Button } from "@/_shad/components/ui/button";
import { AuthContext } from "@/contexts/auth.context";
import { MAIN_MENU_ITEMS } from "../constants/menu.constant";
import { Sheet, SheetContent, SheetTrigger } from "@/_shad/components/ui/sheet";

export default function AppSideMenu() {
  const navigate = useNavigate();
  const { signOut, user } = useContext(AuthContext);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <nav className="w-full flex items-center justify-between">
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>

          <h5>Olá, {user?.name?.split(" ")[0]}</h5>
        </nav>
      </SheetTrigger>

      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <img src={Logo} alt="D" className="h-14 w-14 rounded-md" />

          {MAIN_MENU_ITEMS.map((item, index) => (
            <a
              key={index}
              onClick={() => navigate(item.url)}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <item.icon className="h-5 w-5 transition-all group-hover:scale-110" />
              {item.title}
            </a>
          ))}

          <a
            onClick={signOut}
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-5 w-5" />
            Sair
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
