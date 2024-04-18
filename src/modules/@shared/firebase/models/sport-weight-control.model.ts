import { Timestamp } from "firebase/firestore";
import { orderByDate } from "../../functions/order-by.function";
import { FirebaseAuthenticationService } from "../base/firebase-authentication.service";
import {
  ISportWeightControlDB,
  ISportWeightControlItem,
} from "../interfaces/sport-weight-control.interface";

export class SportWeightControlModel {
  #auth = new FirebaseAuthenticationService();

  public buildItem(model: ISportWeightControlDB): ISportWeightControlItem {
    const progress = model.progress.map((item) => ({
      weight: item.weight,
      creationDate: item.creationDate.toDate(),
    }));

    return {
      ...model,
      id: String(model.id),
      user: model.user?.id,
      creationDate: model.creationDate?.toDate(),
      progress: orderByDate(progress, "creationDate", "DESC"),
    };
  }

  public buildList(model: ISportWeightControlDB[]) {
    return model.map((item) => this.buildItem(item));
  }

  public buildRegisterDTO(
    model: ISportWeightControlItem
  ): ISportWeightControlDB {
    const progress = !!model.progress
      ? model.progress.map((item) => ({
          weight: item.weight,
          creationDate: Timestamp.fromDate(item.creationDate),
        }))
      : [];

    return {
      progress,
      height: model.height,
      goalWeight: model.goalWeight,
      currentWeight: model.currentWeight,
      user: this.#auth.getUserReference(),
      creationDate: model.creationDate
        ? Timestamp.fromDate(model.creationDate)
        : Timestamp.now(),
    };
  }
}
