import { Button } from "@/_shad/components/ui/button";
import Each from "@/modules/@shared/components/utils/each";
import Show from "@/modules/@shared/components/utils/show";
import { Separator } from "@/_shad/components/ui/separator";
import { Circle, CircleCheck, CircleMinus, Pen } from "lucide-react";
import { ISportTrainingSheetDay } from "@/modules/@shared/firebase/interfaces/sport-training-sheet.interface";
interface ITrainingSheetDayViewProps {
  data: ISportTrainingSheetDay[];
  isEditMode?: boolean;

  onEdit?: (item: ISportTrainingSheetDay) => void;
  onRemove?: (item: ISportTrainingSheetDay) => void;
}
export default function TrainingSheetDayView(
  props: ITrainingSheetDayViewProps
) {
  const { data, onEdit, onRemove, isEditMode = false } = props;

  return (
    <Each
      data={data}
      empty={
        <p className="text-center opacity-50">
          - Sem atividades para esse dia -
        </p>
      }
      render={(item) => (
        <article className="bg-accent rounded-sm p-2 px-4 mb-4 flex gap-4 items-center justify-end transition-transform hover:scale-95">
          <Show>
            <Show.When isTrue={!isEditMode}>
              {item.checked ? <CircleCheck /> : <Circle />}
            </Show.When>
          </Show>

          <p className="mr-auto">{item.title}</p>

          <Show>
            <Show.When isTrue={!!item.series && !item.durationMinutes}>
              <span>
                {item.series}/{item.repetitions}
              </span>
            </Show.When>
            <Show.Else>
              <span>{item.durationMinutes}min</span>
            </Show.Else>
          </Show>

          <Show>
            <Show.When isTrue={isEditMode}>
              <Separator orientation="vertical" className="h-12" />

              <Button
                title="Editar"
                variant={"ghost"}
                onClick={() => onEdit?.(item)}
              >
                <Pen className="w-5" />
              </Button>

              <Button
                title="Remover"
                variant={"ghost"}
                onClick={() => onRemove?.(item)}
              >
                <CircleMinus className="w-5 text-red-400" />
              </Button>
            </Show.When>
          </Show>
        </article>
      )}
    />
  );
}
