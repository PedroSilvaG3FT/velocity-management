import {
  doc,
  where,
  query,
  getDoc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  Firestore,
  collection,
  getFirestore,
  DocumentData,
  CollectionReference,
  QueryFieldFilterConstraint,
} from "firebase/firestore";
import { FirebaseApp } from "firebase/app";
import { FirebaseCollectionHelper } from "./firebase-collection.helper";
import { FirebaseConnectorService } from "./firebase-connector.service";
import { FIREBASE_COLLECTION } from "../constans/firebase-collection.contant";

export class FirebaseCollectionBase {
  private _connector = new FirebaseConnectorService();

  public db!: Firestore;
  public app: FirebaseApp;
  public _helper = new FirebaseCollectionHelper();
  public collection!: CollectionReference<DocumentData>;

  constructor(private collectionName: string) {
    this.app = this._connector.app;

    this.db = getFirestore();
    this.collection = collection(this.db, this.collectionName);
  }

  public getAll<Data>(querys: QueryFieldFilterConstraint[] = []) {
    return this.handlerGetAll<Data>(querys);
  }

  public getById<Data>(id: string) {
    return this.handlerGetById<Data>(id);
  }

  public create<Data>(payload: Data) {
    return this.handlerCreate(payload);
  }

  public update<Data>(id: string, payload: Data) {
    return this.handlerUpdate(id, payload);
  }

  public delete(id: string) {
    return deleteDoc(this.getDocumentReference(id));
  }

  public getDocumentReference(id: string, collection = this.collectionName) {
    return doc(this.db, collection, id);
  }

  public async getByColumn<Data>(column: string, value: any) {
    try {
      const snapshot = await getDocs(
        query(this.collection, where(column, "==", value))
      );

      const response = await this._helper.getCollectionData<Data>(snapshot);
      const [result] = response as Data[];

      return (result || {}) as Data;
    } catch (error) {
      throw error;
    }
  }

  public async getByUserId<Data>(userId: string) {
    try {
      const userRef = this.getDocumentReference(
        userId,
        FIREBASE_COLLECTION.user
      );

      const snapshot = await getDocs(
        query(this.collection, where("user", "==", userRef))
      );

      const response = await this._helper.getCollectionData<Data>(snapshot);
      return response as Data[];
    } catch (error: unknown) {
      throw error;
    }
  }

  // #region: Protected methods
  protected async handlerGetAll<Data>(
    querys: QueryFieldFilterConstraint[] = []
  ) {
    try {
      const snapshot = await getDocs(query(this.collection, ...querys));
      return this._helper.getCollectionData<Data>(snapshot);
    } catch (error) {
      throw error;
    }
  }

  protected async handlerGetById<Data>(
    id: string,
    collection = this.collectionName
  ) {
    try {
      const snapshot = await getDoc(this.getDocumentReference(id, collection));
      return this._helper.getDocumentData<Data>(snapshot);
    } catch (error) {
      throw error;
    }
  }

  protected async handlerCreate<Data>(payload: Data) {
    try {
      const response = await addDoc(this.collection, Object(payload));
      return response;
    } catch (error) {
      throw error;
    }
  }

  protected async handlerUpdate<Data>(id: string, payload: Data) {
    try {
      const response = await updateDoc(
        this.getDocumentReference(id),
        Object(payload)
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
  // #endregion: Protected methods
}
