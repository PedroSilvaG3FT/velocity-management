import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/_shad/components/ui/card";
import { cn } from "@/_shad/lib/utils";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

interface IBillingSummaryProps {
  className?: string;
}

export default function BillingSummary(props: IBillingSummaryProps) {
  const { className } = props;

  return (
    <div
      className={cn(
        "grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4",
        className
      )}
    >
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Consumo</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$4,231.89</div>
          <p className="text-xs text-muted-foreground">
            +20.1% do mês anterior
          </p>
        </CardContent>
      </Card>

      <Card x-chunk="dashboard-01-chunk-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Usuários</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+23</div>
          <p className="text-xs text-muted-foreground">
            +180.1% do mês anterior
          </p>
        </CardContent>
      </Card>

      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Requisições</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">+201 do mês anterior</p>
        </CardContent>
      </Card>

      <Card x-chunk="dashboard-01-chunk-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Crédito total</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400">R$363,85</div>
          <p className="text-xs text-muted-foreground">
            Total de crédito disponível
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
