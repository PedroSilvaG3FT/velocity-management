import { UserService } from "./user.service";
import { DatabaseModel } from "../models/database.model";

export class DatabaseService {
  public user = new UserService();
  public _model = new DatabaseModel();
}
