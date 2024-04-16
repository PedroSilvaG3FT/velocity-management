import {
  DocumentData,
  QuerySnapshot,
  DocumentSnapshot,
} from "firebase/firestore";

export type ListDocumentSnapshot = QuerySnapshot<DocumentData>;
export type SingleDocumentSnapshot = DocumentSnapshot<
  DocumentData,
  DocumentData
>;
