import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IFeedingMenuDay {
  time: string;
  title: string;
  checked: boolean;
  description: string;
}

export interface IFeedingMenuDB {
  id?: string;
  title: string;
  active: boolean;
  user: DocumentReference;
  creationDate: Timestamp;

  monday: IFeedingMenuDay[];
  tuesday: IFeedingMenuDay[];
  wednesday: IFeedingMenuDay[];
  thursday: IFeedingMenuDay[];
  friday: IFeedingMenuDay[];
  saturday: IFeedingMenuDay[];
  sunday: IFeedingMenuDay[];
}

export interface IFeedingMenuItem {}
