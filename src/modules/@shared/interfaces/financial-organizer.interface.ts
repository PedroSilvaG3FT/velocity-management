import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IFinancialOrganizerControl {
  title: string;
  color: string;
  order: number;
  amount: number;
  creationDate: Date;
}

export interface IFinancialOrganizerDB {
  id?: string;
  title: string;
  amount: number;
  creationDate: Timestamp;
  userId: DocumentReference;
  control: IFinancialOrganizerControl;
}

export interface IFinancialOrganizerItem {}
