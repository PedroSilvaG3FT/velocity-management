import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  IDialogProps,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/_shad/components/ui/dialog";

import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import loadingStore from "@/store/loading.store";
import { Button } from "@/_shad/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer } from "@/_shad/components/ui/form";
import AppFormInput from "@/modules/@shared/components/form/form-input";
import { SportWeightControlModel } from "@/modules/@shared/firebase/models/sport-weight-control.model";
import { SportWeightControlService } from "@/modules/@shared/firebase/services/sport-weight-control.service";
import { ISportWeightControlItem } from "@/modules/@shared/firebase/interfaces/sport-weight-control.interface";

const formId = "weight-control-register-form";
const formSchema = z.object({
  height: z.string().min(1, "Campo obrigatório"),
  goalWeight: z.string().min(1, "Campo obrigatório"),
  currentWeight: z.string(),
});

interface IWeightControlRegisterModalProps extends IDialogProps {
  data: ISportWeightControlItem;
  onFinish: (data: ISportWeightControlItem) => void;
}

const _sportWeightControlModel = new SportWeightControlModel();
const _sportWeightControlService = new SportWeightControlService();

export default function WeightControlRegisterModal(
  props: IWeightControlRegisterModalProps
) {
  const { data, children, onFinish, isOpen, onOpenChange } = props;
  const hasControl = !!data.id;

  const _loadingStore = loadingStore((state) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: "",
      goalWeight: "",
      currentWeight: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    _loadingStore.setShow(true);

    const modelDTO = _sportWeightControlModel.buildRegisterDTO({
      ...data,
      height: Number(values.height),
      goalWeight: Number(values.goalWeight),
      currentWeight: data.currentWeight || Number(values.currentWeight),
      progress: hasControl
        ? data.progress
        : [{ creationDate: new Date(), weight: Number(values.currentWeight) }],
    });

    const $request = !hasControl
      ? _sportWeightControlService.create(modelDTO)
      : _sportWeightControlService.update(String(data.id), modelDTO);

    $request
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

  useEffect(() => {
    if (isOpen && hasControl) {
      form.setValue("height", String(data.height));
      form.setValue("goalWeight", String(data.goalWeight));
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <FormContainer {...form}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {hasControl ? "Editar metas" : "Criar metas"}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos a baixo e clique em salvar para registrar e
              atingir as suas metas
            </DialogDescription>
          </DialogHeader>

          <section className="grid gap-4 py-4">
            <form
              id={formId}
              className="space-y-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <AppFormInput
                name="height"
                type="number"
                label="Altura (em cm)"
                control={form.control}
                placeholder="Insira a sua altura em centimetros"
              />

              <AppFormInput
                type="number"
                step="0.5"
                name="goalWeight"
                label="Meta de peso"
                control={form.control}
                placeholder="Insira a sua meta de peso"
              />

              {!hasControl && (
                <AppFormInput
                  type="number"
                  label="Peso Atual"
                  name="currentWeight"
                  control={form.control}
                  placeholder="Qual o seu peso atual"
                />
              )}
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
