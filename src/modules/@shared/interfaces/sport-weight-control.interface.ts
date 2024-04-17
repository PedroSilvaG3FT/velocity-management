import { DocumentReference, Timestamp } from "firebase/firestore";

export interface ISportWeightControlProgress {
  weight: number;
  creationDate: Timestamp;
}

export interface ISportWeightControlDB {
  id?: string;
  goalWeight: number;
  currentWeight: number;
  user: DocumentReference;
  creationDate: Timestamp;
  progress: ISportWeightControlProgress[];
}

export interface ISportWeightControlItem {}
