import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface ISportTrainingSheetDay {
  title: string;
  videoURL: string;
  checked: boolean;
  repetitions: number;
  durationMinutes: number;
}

export interface ISportTrainingSheetDB {
  id?: string;
  title: string;
  active: boolean;
  creationDate: Timestamp;
  user: DocumentReference;

  monday: ISportTrainingSheetDay[];
  tuesday: ISportTrainingSheetDay[];
  wednesday: ISportTrainingSheetDay[];
  thursday: ISportTrainingSheetDay[];
  friday: ISportTrainingSheetDay[];
  saturday: ISportTrainingSheetDay[];
  sunday: ISportTrainingSheetDay[];
}

export interface ISportTrainingSheetItem {}
