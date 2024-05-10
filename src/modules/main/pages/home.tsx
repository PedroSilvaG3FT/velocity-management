import authStore from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import Each from "@/modules/@shared/components/utils/each";
import { MAIN_MENU_ITEMS } from "../constants/menu.constant";
import {
  CardBody3d,
  CardItem3d,
  CardContainer3d,
} from "@/modules/@shared/components/aceternity/3d-card";
import { Separator } from "@/_shad/components/ui/separator";

export default function Home() {
  const navigate = useNavigate();
  const _authStore = authStore((state) => state);

  return (
    <section>
      <h1 className="text-lg font-bold">
        Olá {_authStore.user?.name?.split(" ")[0]}
      </h1>

      <h2>bem-vindo ao Velocity Management</h2>

      <Separator className="my-4" />

      <p className="mt-4 text-sm text-muted-foreground">
        Esse é o seu hub central para gerenciar diversos aspectos da sua
        plataforma. Explore nossos módulos abaixo para começar a sua jornada.
      </p>

      <section className="mt-6 grid gap-4 grid-cols-5 tablet:grid-cols-2 mobile:grid-cols-2">
        <Each
          data={MAIN_MENU_ITEMS.filter((item) => !!item.url)}
          render={(item) => (
            <CardContainer3d
              containerClassName="p-0"
              className="w-full cursor-pointer"
              onClick={() => navigate(item.url)}
            >
              <CardBody3d className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] h-auto rounded-xl p-6 border dark:border-none">
                <CardItem3d
                  translateZ="50"
                  className="w-full text-lg text-center font-bold text-neutral-600 dark:text-white"
                >
                  {item.title}
                </CardItem3d>

                <CardItem3d translateZ="100" className="w-full mt-4">
                  <figure className="w-full h-28 flex items-center justify-center object-cover rounded-xl group-hover/card:shadow-2xl">
                    <item.icon className="w-14 h-14 transition-all group-hover/card:text-primary group-hover/card:scale-110" />
                  </figure>
                </CardItem3d>
              </CardBody3d>
            </CardContainer3d>
          )}
        />
      </section>
    </section>
  );
}
