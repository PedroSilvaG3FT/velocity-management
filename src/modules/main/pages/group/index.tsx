import { format } from "date-fns";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/_shad/components/ui/card";
import { Button } from "@/_shad/components/ui/button";
import Each from "@/modules/@shared/components/utils/each";
import { Separator } from "@/_shad/components/ui/separator";
import Animate from "@/modules/@shared/components/utils/animate";

export default function Group() {
  const mockGroup = {
    id: Math.random(),
    name: "Grupo teste",
    creationDate: new Date(),
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    users: [
      { id: 1, name: "Pedro Silva", role: "Dev. Frontend" },
      { id: 2, name: "Rubens Gomes", role: "Dev. Backend" },
      { id: 3, name: "Pedro Silva", role: "Dev. Frontend" },
      { id: 4, name: "Rubens Gomes", role: "Dev. Backend" },
    ],
  };

  const [groups, setGroups] = useState<any[]>([]);

  const getGroups = () => {
    setGroups([
      mockGroup,
      mockGroup,
      mockGroup,
      mockGroup,
      mockGroup,
      mockGroup,
    ]);
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <section>
      <h2 className="mb-6 text-lg font-bold">Grupos</h2>

      <section className="grid gap-4 grid-cols-4">
        <Each
          data={groups}
          render={(item) => (
            <Animate animation="fadeIn">
              <Card className="p-4 transition-all duration-500 hover:scale-95">
                <figure className="h-14 w-14 mb-4 rounded-full border flex items-center justify-center">
                  <Users />
                </figure>

                <h5 className="text-lg font-semibold">{item.name}</h5>
                <Separator className="my-2" />

                <p>{item.description}</p>

                <footer className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {format(item.creationDate, "dd/MM/yyyy")}
                  </p>

                  <Button variant={"ghost"}>Ver detalhes</Button>
                </footer>
              </Card>
            </Animate>
          )}
        />
      </section>
    </section>
  );
}
