import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IVehicleDB {
  id?: string;
  year: number;
  model: string;
  brand: string;
  active: boolean;
  imageURL: string;
  principal: boolean;
  user: DocumentReference;
  creationDate: Timestamp;
}

export interface IVehicleItem {}
