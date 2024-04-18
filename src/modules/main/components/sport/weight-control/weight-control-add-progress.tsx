import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  IDialogProps,
  DialogTrigger,
  DialogContent,
} from "@/_shad/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import loadingStore from "@/store/loading.store";
import { Button } from "@/_shad/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer } from "@/_shad/components/ui/form";
import AppFormInput from "@/modules/@shared/components/form/form-input";
import { SportWeightControlModel } from "@/modules/@shared/firebase/models/sport-weight-control.model";
import { SportWeightControlService } from "@/modules/@shared/firebase/services/sport-weight-control.service";
import { ISportWeightControlItem } from "@/modules/@shared/firebase/interfaces/sport-weight-control.interface";

const formId = "add-weight-form";
const formSchema = z.object({
  currentWeight: z.string().min(1, "Campo obrigatório"),
});

const _sportWeightControlModel = new SportWeightControlModel();
const _sportWeightControlService = new SportWeightControlService();

interface IWeightControlAddProgressProps extends IDialogProps {
  data: ISportWeightControlItem;
  onFinish: (data: ISportWeightControlItem) => void;
}

export default function WeightControlAddProgress(
  props: IWeightControlAddProgressProps
) {
  const { data, children, onFinish, isOpen, onOpenChange } = props;

  const _loadingStore = loadingStore((state) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentWeight: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    _loadingStore.setShow(true);

    const value = Number(values.currentWeight);
    const modelDTO = _sportWeightControlModel.buildRegisterDTO({
      ...data,
      currentWeight: value,
      progress: [...data.progress, { creationDate: new Date(), weight: value }],
    });
    _sportWeightControlService
      .update(String(data.id), modelDTO)
      .then(() => {
        const result = _sportWeightControlModel.buildItem(modelDTO);
        onFinish({ ...data, ...result, id: data.id });
        _loadingStore.setShow(false);
      })
      .catch((error) => {
        console.log(error);
        _loadingStore.setShow(false);
      });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <FormContainer {...form}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Atualizar peso atual</DialogTitle>
          </DialogHeader>

          <section className="grid gap-4 py-4">
            <form
              id={formId}
              className="space-y-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <AppFormInput
                type="number"
                label="Peso Atual"
                name="currentWeight"
                control={form.control}
                placeholder="Qual o seu peso atual"
              />
            </form>
          </section>

          <DialogFooter>
            <Button type="submit" form={formId}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormContainer>
    </Dialog>
  );
}
