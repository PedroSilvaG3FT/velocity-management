import { DocumentReference, Timestamp } from "firebase/firestore";

export interface ISportTrainingSheetDay {
  title: string;
  videoURL: string;
  checked: boolean;
  series: number;
  repetitions: number;
  durationMinutes: number;
}

export interface ISportTrainingSheetDB {
  id?: string;
  title: string;
  active: boolean;
  description: string;
  creationDate: Timestamp;
  user: DocumentReference;

  sunday: ISportTrainingSheetDay[];
  monday: ISportTrainingSheetDay[];
  tuesday: ISportTrainingSheetDay[];
  wednesday: ISportTrainingSheetDay[];
  thursday: ISportTrainingSheetDay[];
  friday: ISportTrainingSheetDay[];
  saturday: ISportTrainingSheetDay[];
}

export interface ISportTrainingSheetItem
  extends Omit<ISportTrainingSheetDB, "creationDate" | "user"> {
  user: string;
  creationDate: Date;
}
