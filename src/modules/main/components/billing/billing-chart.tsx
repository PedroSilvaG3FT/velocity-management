import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/_shad/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/_shad/components/ui/tabs";
import { format } from "date-fns";
import { useEffect, useState } from "react";

import { Bar, XAxis, YAxis, BarChart, ResponsiveContainer } from "recharts";

interface IBillingChartProps {
  className?: string;
  mode: "month" | "week" | "day";
}

interface IBillingChartData {
  amount: number;
  date: Date | string;
}

export default function BillingChart(props: IBillingChartProps) {
  const { className, mode } = props;

  const data: IBillingChartData[] = [
    { amount: 400, date: new Date(2024, 2, 1) },
    { amount: 300, date: new Date(2024, 2, 2) },
    { amount: 200, date: new Date(2024, 2, 3) },
    { amount: 300, date: new Date(2024, 2, 4) },
    { amount: 200, date: new Date(2024, 2, 5) },
    { amount: 278, date: new Date(2024, 2, 6) },
    { amount: 189, date: new Date(2024, 2, 7) },
  ];

  const [chartData, setChartData] = useState<IBillingChartData[]>([]);

  const initData = () => {
    const weekData = data.map((item) => ({
      ...item,
      date: format(new Date(item.date), "dd/MM"),
    }));

    setChartData(weekData);
  };

  useEffect(() => {
    initData();
  }, [mode]);

  return (
    <Card className={className} x-chunk="dashboard-01-chunk-5">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Uso recente</CardTitle>

        <Tabs defaultValue="week">
          <TabsList>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="month">Mês</TabsTrigger>
            <TabsTrigger value="year">Ano</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="h-[350px] pl-0">
        <ResponsiveContainer
          className="overflow-x-auto"
          width="100%"
          height="100%"
        >
          <BarChart data={chartData}>
            <YAxis />
            <XAxis dataKey="date" />

            <Bar
              dataKey="amount"
              style={{
                opacity: 0.9,
                fill: "hsl(var(--foreground))",
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
