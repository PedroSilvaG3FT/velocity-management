import { IMenuItem } from "../interfaces/menu.interface";
import {
  Home,
  BarChart,
  Users,
  Settings,
  Boxes,
  Component,
} from "lucide-react";

export const MAIN_MENU_ITEMS: IMenuItem[] = [
  { url: ``, icon: Home, title: `Home` },
  { url: `billing`, icon: BarChart, title: `Consumo` },
  { url: `group`, icon: Boxes, title: `Grupos` },
  { url: `user`, icon: Users, title: `Usuários` },
  { url: `settings`, icon: Settings, title: `Configurações` },
  { url: `playground`, icon: Component, title: `Playground` },
];
