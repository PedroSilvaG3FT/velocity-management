import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/_shad/components/ui/button";
import { DataTable } from "@/_shad/components/ui/datatable";
import {
  Pen,
  Plus,
  CircleCheck,
  CircleMinus,
  CircleSlash,
  ClipboardList,
  MoreHorizontal,
} from "lucide-react";
import { ISportTrainingSheetItem } from "@/modules/@shared/firebase/interfaces/sport-training-sheet.interface";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/_shad/components/ui/dropdown-menu";
import TrainingSheetDrawer from "./training-sheet-drawer";
import { useState } from "react";

interface ITrainingSheetListProps {
  data: ISportTrainingSheetItem[];
}
export default function TrainingSheetList(props: ITrainingSheetListProps) {
  const { data } = props;

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openRegister = () => setIsRegisterOpen(true);

  const _getItemById = (id: string) => data.find((item) => item.id === id);

  const handleUpdateActive = (id: string) => {
    const item = _getItemById(id);
    console.log("handleUpdateActive : ", item);
  };

  const handleOpenEdit = (id: string) => {
    const item = _getItemById(id);
    console.log("handleOpenEdit : ", item);
  };

  const handleDelete = (id: string) => {
    const item = _getItemById(id);
    console.log("handleDelete : ", item);
  };

  const columns: ColumnDef<ISportTrainingSheetItem>[] = [
    {
      header: "Ativo",
      accessorKey: "active",
      cell: ({ row }) => {
        return row.getValue("active") ? (
          <CircleCheck className="text-green-400" />
        ) : (
          <CircleSlash />
        );
      },
    },
    { header: "Titulo", accessorKey: "title" },
    { header: "Descrição", accessorKey: "description" },
    {
      id: "actions",
      cell: ({ row }) => {
        const itemId = String(row.original.id);

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleUpdateActive(itemId)}>
                <ClipboardList className="w-4 mr-2" />
                Usar ficha
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleOpenEdit(itemId)}>
                <Pen className="w-4 mr-2" />
                Editar
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-400"
                onClick={() => handleDelete(itemId)}
              >
                <CircleMinus className="w-4 mr-2" />
                Remover
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <section>
      <nav className="mb-4 flex items-center justify-between">
        <h2 className="font-xl font-semibold">Minhas fichas de treino </h2>

        <TrainingSheetDrawer
          isOpen={isRegisterOpen}
          onOpenChange={(data) => setIsRegisterOpen(data)}
        >
          <Button onClick={openRegister}>
            Nova Ficha
            <Plus className="ml-4" />
          </Button>
        </TrainingSheetDrawer>
      </nav>

      <DataTable
        columns={columns}
        data={data}
        pagination={{ pageSize: 5, pageIndex: 0 }}
      />
    </section>
  );
}
