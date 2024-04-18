import { Timestamp } from "firebase/firestore";
import { FirebaseAuthenticationService } from "../base/firebase-authentication.service";
import {
  ISportTrainingSheetDB,
  ISportTrainingSheetItem,
} from "../interfaces/sport-training-sheet.interface";

export class SportTrainingSheetModel {
  #auth = new FirebaseAuthenticationService();

  public buildItem(model: ISportTrainingSheetDB): ISportTrainingSheetItem {
    return {
      ...model,
      id: String(model.id),
      user: model.user?.id,
      creationDate: model.creationDate?.toDate(),
    };
  }

  public buildList(model: ISportTrainingSheetDB[]) {
    return model.map((item) => this.buildItem(item));
  }

  public buildRegisterDTO(
    model: ISportTrainingSheetItem
  ): ISportTrainingSheetDB {
    return {
      id: model.id,
      title: model.title,
      active: model.active,
      description: model.description,
      monday: model.monday,
      tuesday: model.tuesday,
      wednesday: model.wednesday,
      thursday: model.thursday,
      friday: model.friday,
      saturday: model.saturday,
      sunday: model.sunday,

      user: this.#auth.getUserReference(),
      creationDate: model.creationDate
        ? Timestamp.fromDate(model.creationDate)
        : Timestamp.now(),
    };
  }
}
