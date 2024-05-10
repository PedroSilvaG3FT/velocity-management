import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme.context";
import { Button } from "@/_shad/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/_shad/components/ui/dropdown-menu";
import { EThemeType } from "../enums/theme.enum";

interface IToggleThemeProps {
  className?: string;
  alignContent?: "center" | "end" | "start";
}

export function ToggleTheme(props: IToggleThemeProps) {
  const { className, alignContent = "center" } = props;
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={className} variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={alignContent}>
        <DropdownMenuItem onClick={() => setTheme(EThemeType.light)}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(EThemeType.dark)}>
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(EThemeType.system)}>
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
