import { useContext } from "react";
import Logo from "@/assets/logo.svg";
import { LogOut, UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/auth.context.tsx";
import { MAIN_MENU_ITEMS } from "../constants/menu.constant.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/_shad/components/ui/tooltip";
import { ToggleTheme } from "@/modules/@shared/components/toggle-theme.tsx";

export default function AppAside() {
  const navigate = useNavigate();
  const { signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
    navigate("auth/sign-in");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <img
              src={Logo}
              alt="V"
              className="w-6 object-contain relative left-0.5"
            />
          </TooltipTrigger>

          <TooltipContent side="right">Velocity</TooltipContent>
        </Tooltip>

        {MAIN_MENU_ITEMS.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <a
                onClick={() => navigate(item.url)}
                className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all duration-300 hover:text-foreground md:h-8 md:w-8 hover:scale-110"
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.title}</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">{item.title}</TooltipContent>
          </Tooltip>
        ))}
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <ToggleTheme />

        <Tooltip>
          <TooltipTrigger asChild>
            <a
              onClick={() => navigate("/profile")}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors cursor-pointer hover:text-foreground md:h-8 md:w-8"
            >
              <UserCog className="h-5 w-5" />
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">Meu Perfil</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <a
              onClick={handleSignOut}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors cursor-pointer hover:text-foreground md:h-8 md:w-8"
            >
              <LogOut className="h-5 w-5" />
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">Sair</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
