import { FirebaseCollectionBase } from "../base/firebase-collection.base";
import { FIREBASE_COLLECTION } from "../constans/firebase-collection.contant";

export class SportTrainingSheetService extends FirebaseCollectionBase {
  constructor() {
    super(FIREBASE_COLLECTION.sportTrainingSheet);
  }
}
