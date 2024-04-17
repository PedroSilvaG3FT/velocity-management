import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IVehicleReminderDB {
  id?: string;
  title: string;
  description: string;
  recurrenceDays: string;
  creationDate: Timestamp;
  reminderDate: Timestamp;
  vehicle: DocumentReference;
}

export interface IVehicleReminderItem {}
