import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IFinancialControlDB {
  id?: string;
  amount: number;
  endDate: Timestamp;
  description: string;
  user: DocumentReference;
  type: DocumentReference;
  creationDate: Timestamp;
  category: DocumentReference;
}

export interface IFinancialControlItem {}
