import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/_shad/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/_shad/components/ui/datatable";
import { CurrencyUtil } from "@/modules/@shared/util/currency.util";

export interface IBillingModelConsumptionProps {
  className?: string;
}

interface IMockData {
  model: string;
  amount: number;
  credit: number;
}

export default function BillingModelConsumption(
  props: IBillingModelConsumptionProps
) {
  const { className } = props;

  const data = [
    { model: "M1", amount: 4.75, credit: 50.0 },
    { model: "M2", amount: 7.9, credit: 110.0 },
    { model: "M3", amount: 8.3, credit: 34.7 },
    { model: "M4", amount: 9.9, credit: 200.0 },
  ];

  const columns: ColumnDef<IMockData>[] = [
    { header: "Modelo", accessorKey: "model" },
    {
      header: "Valor",
      accessorKey: "amount",
      cell: ({ row }) => (
        <span>{CurrencyUtil.format(row.getValue("amount"))}</span>
      ),
    },
    {
      header: "Credito",
      accessorKey: "credit",
      cell: ({ row }) => (
        <span className="text-orange-400">
          {CurrencyUtil.format(row.getValue("credit"))}
        </span>
      ),
    },
    {
      header: "Total",
      cell: ({ row }) => {
        const amount = Number(row.getValue("amount"));
        const credit = Number(row.getValue("credit"));
        const total = credit - amount;

        const colorClassName = total <= 0 ? "text-red-400" : "text-green-400";

        return (
          <span className={colorClassName}>{CurrencyUtil.format(total)}</span>
        );
      },
    },
  ];

  return (
    <Card className={className} x-chunk="dashboard-01-chunk-4">
      <CardHeader>
        <CardTitle className="mb-1">Modelos</CardTitle>
        <CardDescription>Visão geral do uso de modelos</CardDescription>
      </CardHeader>

      <CardContent>
        <DataTable
          data={data}
          columns={columns}
          pagination={{ pageSize: 5, pageIndex: 0 }}
        />
      </CardContent>
    </Card>
  );
}
