import { DocumentReference, Timestamp } from "firebase/firestore";

export interface ISportWeightControlProgress {
  weight: number;
  creationDate: Date;
}

export interface ISportWeightControlProgressDB {
  weight: number;
  creationDate: Timestamp;
}
export interface ISportWeightControlDB {
  id?: string;
  height: number;
  goalWeight: number;
  currentWeight: number;
  user: DocumentReference;
  creationDate: Timestamp;
  progress: ISportWeightControlProgressDB[];
}

export interface ISportWeightControlItem
  extends Omit<ISportWeightControlDB, "creationDate" | "user" | "progress"> {
  user: string;
  creationDate: Date;
  progress: ISportWeightControlProgress[];
}
