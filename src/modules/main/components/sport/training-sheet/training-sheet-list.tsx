import { ISportTrainingSheetItem } from "@/modules/@shared/firebase/interfaces/sport-training-sheet.interface";

interface ITrainingSheetListProps {
  data: ISportTrainingSheetItem[];
}
export default function TrainingSheetList(props: ITrainingSheetListProps) {
  return (
    <section>
      <article> training-sheet-list</article>
    </section>
  );
}
