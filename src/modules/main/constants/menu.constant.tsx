import { IMenuItem } from "../interfaces/menu.interface";
import { Home, CarFront, Apple, Dumbbell, HandCoins } from "lucide-react";

export const MAIN_MENU_ITEMS: IMenuItem[] = [
  { url: `home`, icon: Home, title: `Home` },
  { url: `vehicle`, icon: CarFront, title: `Veiculos` },
  { url: `feeding`, icon: Apple, title: `Alimentação` },
  { url: `sport`, icon: Dumbbell, title: `Esportes` },
  { url: `financial`, icon: HandCoins, title: `Financeiro` },
];
