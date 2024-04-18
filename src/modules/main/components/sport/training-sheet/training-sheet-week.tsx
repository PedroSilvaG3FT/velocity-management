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
import { Separator } from "@/_shad/components/ui/separator";
import TrainingSheetDayView from "./training-sheet-day-view";
import { WeekDayNumber } from "@/modules/@shared/components/_types/week.type";
import WeekDaySelection from "@/modules/@shared/components/week-day-selection";
import { IWeekDayItem } from "@/modules/@shared/components/_interfaces/week.interface";

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

    const key = dayKeyMap[item.day] as keyof typeof data;
    setDayView(data[key] as ISportTrainingSheetDay[]);
  };

  useEffect(() => {
    const date = new Date();
    onSelectDay({ date, day: date.getDay() as WeekDayNumber });
  }, [data]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Semana</CardTitle>

          <WeekDaySelection
            onSelect={onSelectDay}
            className="max-w-[calc(100vw-82px)]"
          />
          <Separator />
        </CardHeader>

        <CardContent>
          <TrainingSheetDayView data={dayView} />
        </CardContent>
      </Card>
    </>
  );
}
