import {
  Auth,
  getAuth,
  signOut,
  updateProfile,
  setPersistence,
  sendPasswordResetEmail,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { FirebaseCollectionBase } from "./firebase-collection.base";
import { IUserDB, IUserRegister } from "../../interfaces/user.interface";

export interface IFirebaseAuthenticationCredentials {
  email: string;
  password: string;
}

export class FirebaseAuthenticationService extends FirebaseCollectionBase {
  private auth: Auth;

  constructor() {
    super("User");
    this.auth = getAuth();
  }

  public async signUp(data: IUserRegister) {
    try {
      const response = await createUserWithEmailAndPassword(
        this.auth,
        data.email,
        data.password
      );

      await this.create<IUserRegister>({
        ...data,
        uid: response.user.uid,
      });

      if (this.auth.currentUser) {
        await updateProfile(this.auth.currentUser, {
          displayName: data.name,
        });
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async signIn({ email, password }: IFirebaseAuthenticationCredentials) {
    try {
      await setPersistence(this.auth, browserSessionPersistence);

      const response = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      const refreshToken = response.user.refreshToken;
      const { token: accessToken } = await response.user.getIdTokenResult();

      const data = await this.getByColumn<IUserDB>("uid", response.user.uid);

      const result = {
        ...response,
        user: {
          ...response.user,
          refreshToken,
          accessToken,
          data,
        },
      };

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async recoveryPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  public signOut() {
    return signOut(this.auth);
  }
}
