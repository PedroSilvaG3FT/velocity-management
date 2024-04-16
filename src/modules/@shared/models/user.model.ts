import { Timestamp } from "firebase/firestore";
import { IUserDB, IUser } from "../interfaces/user.interface";

export class UserModel {
  public buildItem(model: IUserDB): IUser {
    return {
      ...model,
      id: String(model.id),
      creationDate: model.creationDate?.toDate(),
    };
  }

  public buildList(model: IUserDB[]) {
    return model.map((item) => this.buildItem(item));
  }

  public buildRegisterDTO(model: IUser): IUserDB {
    return {
      uid: model.uid || "",
      name: model.name || "",
      active: !!model.active,
      email: model.email || "",
      creationDate: Timestamp.now(),
      phoneNumber: model.phoneNumber || "",
      profileImageURL: model.profileImageURL || "",
    };
  }
}
