import { Separator } from "@/_shad/components/ui/separator";
import BillingChart from "../../components/billing/billing-chart";
import BillingSummary from "../../components/billing/billing-summary";
import BillingModelConsumption from "../../components/billing/billing-model-consumption";
import { Button } from "@/_shad/components/ui/button";
import { History } from "lucide-react";

export default function Billing() {
  return (
    <section>
      <nav className="mb-6 flex gap-2 items-center justify-between mobile:flex-col mobile:items-start">
        <h2 className="text-lg font-bold">
          Monitoramento de uso -{" "}
          <span className="text-primary">Março, 2024</span>
        </h2>

        <Button variant={"secondary"}>
          Histórico <History className="ml-3 w-4" />
        </Button>
      </nav>

      <BillingSummary />
      <Separator className="my-6" />

      <article className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <BillingModelConsumption className="xl:col-span-2" />
        <BillingChart mode="week" />
      </article>
    </section>
  );
}
