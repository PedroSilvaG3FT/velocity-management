import { IMenuItem } from "../interfaces/menu.interface";
import { Home, Users2, Package, LineChart, ShoppingCart } from "lucide-react";

export const MAIN_MENU_ITEMS: IMenuItem[] = [
  { url: `home`, icon: Home, title: `Dashboard` },
  { url: ``, icon: ShoppingCart, title: `Orders` },
  { url: ``, icon: Package, title: `Products` },
  { url: ``, icon: Users2, title: `Customers` },
  { url: ``, icon: LineChart, title: `Analytics` },
];
