import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IFinancialGoalDB {
  id?: string;
  title: string;
  imageURL: string;
  goalAmount: number;
  goalDate: Timestamp;
  currentAmount: number;
  creationDate: Timestamp;
  userId: DocumentReference;
}

export interface IFinancialGoalItem {}
