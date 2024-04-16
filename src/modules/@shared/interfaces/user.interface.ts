import { Timestamp } from "firebase/firestore";

export interface IUserDB {
  id?: string;
  uid: string;
  name: string;
  email: string;
  active: boolean;
  phoneNumber: string;
  profileImageURL: string;
  creationDate: Timestamp;
}

export interface IUserRegister extends IUserDB {
  password: string;
}

export interface IUser extends Omit<IUserDB, "creationDate"> {
  creationDate: Date;
}
