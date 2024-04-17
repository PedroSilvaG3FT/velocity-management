import { FirebaseCollectionBase } from "../firebase/firebase-collection.base";
import { FIREBASE_COLLECTION } from "../firebase/@constans/firebase-collection.contant";

export class FinancialControlTypeService extends FirebaseCollectionBase {
  constructor() {
    super(FIREBASE_COLLECTION.financialControlType);
  }
}
