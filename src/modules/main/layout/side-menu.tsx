import { useNavigate } from "react-router-dom";
import { Button } from "@/_shad/components/ui/button";
import { MAIN_MENU_ITEMS } from "../constants/menu.constant";
import { Settings, Package2, PanelLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/_shad/components/ui/sheet";

export default function AppSideMenu() {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <a className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </a>

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

          <a className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5" />
            Settings
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
