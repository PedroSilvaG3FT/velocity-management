import { FirebaseCollectionBase } from "../firebase/firebase-collection.base";
import { FIREBASE_COLLECTION } from "../firebase/@constans/firebase-collection.contant";

export class FinancialControlService extends FirebaseCollectionBase {
  constructor() {
    super(FIREBASE_COLLECTION.financialControl);
  }
}
