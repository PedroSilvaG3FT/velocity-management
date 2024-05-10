import { DataTable } from "@/_shad/components/ui/datatable";
import { ColumnDef } from "@tanstack/react-table";

interface IUserMock {
  id: number;
  name: string;
  role: string;
  email: string;
  groupName: string;
}

export default function User() {
  const data: IUserMock[] = [
    {
      id: 1,
      name: "Pedro Silva",
      role: "Dev. Frontend",
      email: `email@teste.com`,
      groupName: "Grupo Teste",
    },
    {
      id: 2,
      name: "Rubens Gomes",
      role: "Dev. Backend",
      email: `email@teste.com`,
      groupName: "Grupo Teste",
    },
    {
      id: 3,
      name: "Pedro Silva",
      role: "Dev. Frontend",
      email: `email@teste.com`,
      groupName: "Grupo Teste",
    },
    {
      id: 4,
      name: "Rubens Gomes",
      role: "Dev. Backend",
      email: `email@teste.com`,
      groupName: "Grupo Teste",
    },
  ];

  const columns: ColumnDef<IUserMock>[] = [
    { header: "", accessorKey: "id" },
    { header: "Nome", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Grupo", accessorKey: "groupName" },
  ];

  return (
    <section>
      <h2 className="mb-6 text-lg font-bold">Usuários</h2>

      <DataTable
        data={data}
        columns={columns}
        pagination={{ pageSize: 5, pageIndex: 0 }}
      />
    </section>
  );
}
