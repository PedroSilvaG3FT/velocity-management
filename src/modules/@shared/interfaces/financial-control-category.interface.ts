import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IFinancialControlCategoryDB {
  id?: string;
  icon: string;
  color: string;
  title: string;
  active: boolean;
  isDefault: boolean;
  user: DocumentReference;
  creationDate: Timestamp;
}

export interface IFinancialControlCategoryItem {}
