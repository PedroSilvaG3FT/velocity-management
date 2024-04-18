import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/_shad/components/ui/card";
import {
  ISportTrainingSheetDay,
  ISportTrainingSheetItem,
} from "@/modules/@shared/firebase/interfaces/sport-training-sheet.interface";

import { useEffect, useState } from "react";
import { Circle, CircleCheck } from "lucide-react";
import Each from "@/modules/@shared/components/utils/each";
import Show from "@/modules/@shared/components/utils/show";
import { Separator } from "@/_shad/components/ui/separator";
import WeekDaySelection from "@/modules/@shared/components/week-day-selection";
import { IWeekDayItem } from "@/modules/@shared/components/_interfaces/week.interface";
import { WeekDayNumber } from "@/modules/@shared/components/_types/week.type";

interface ITrainingSheetWeekProps {
  data: ISportTrainingSheetItem;
}
export default function TrainingSheetWeek(props: ITrainingSheetWeekProps) {
  const { data } = props;
  const [dayView, setDayView] = useState<ISportTrainingSheetDay[]>([]);

  const onSelectDay = (item: IWeekDayItem) => {
    const dayKeyMap = {
      0: "sunday",
      1: "monday",
      2: "tuesday",
      3: "wednesday",
      4: "thursday",
      5: "friday",
      6: "saturday",
    };

    console.log(data);

    const key = dayKeyMap[item.day] as keyof typeof data;
    setDayView(data[key] as ISportTrainingSheetDay[]);
  };

  useEffect(() => {
    if (!dayView?.length) {
      const date = new Date();
      onSelectDay({ date, day: date.getDay() as WeekDayNumber });
    }
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Semana</CardTitle>
        <WeekDaySelection onSelect={onSelectDay} />
        <Separator />
      </CardHeader>

      <CardContent>
        <Each
          data={dayView}
          empty={<p className="text-center opacity-50">- Dia livre -</p>}
          render={(item) => (
            <article className="bg-accent rounded-sm p-2 px-4 mb-4 flex gap-4 items-center justify-end transition-transform hover:scale-95">
              {item.checked ? <CircleCheck /> : <Circle />}

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
            </article>
          )}
        />
      </CardContent>
    </Card>
  );
}
