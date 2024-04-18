import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  IDialogProps,
} from "@/_shad/components/ui/dialog";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/_shad/components/ui/table";
import Each from "@/modules/@shared/components/utils/each";
import { ISportWeightControlItem } from "@/modules/@shared/firebase/interfaces/sport-weight-control.interface";
import { format } from "date-fns";

interface IWeightControlProgressProps extends IDialogProps {
  data: ISportWeightControlItem;
}

export default function WeightControlProgressModal(
  props: IWeightControlProgressProps
) {
  const { data, children, isOpen, onOpenChange } = props;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Progresso</DialogTitle>
        </DialogHeader>

        <section className="overflow-y-auto max-h-[60vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Peso</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <Each
                data={data.progress}
                render={(item) => (
                  <TableRow>
                    <TableCell>{item.weight}kg</TableCell>
                    <TableCell>
                      {format(item.creationDate, "dd/MM/yyyy HH:mm")}
                    </TableCell>
                  </TableRow>
                )}
              />
            </TableBody>
          </Table>
        </section>
      </DialogContent>
    </Dialog>
  );
}
