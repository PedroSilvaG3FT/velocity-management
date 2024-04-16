import { initializeApp } from "firebase/app";
import { FIREBASE_CONFIG } from "./firebase.config";

export class FirebaseConnectorService {
  public app;

  constructor() {
    this.app = initializeApp(FIREBASE_CONFIG);
  }
}
