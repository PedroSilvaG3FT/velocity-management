import { ICredentialsSignIn } from "../interfaces/auth.interface";
import { IUser } from "../interfaces/user.interface";

interface IMockResponseLogin {
  user: IUser;
  token: string;
}

export class UserService {
  public signIn(data: ICredentialsSignIn): Promise<IMockResponseLogin> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: "jwt_access_token",
          user: { email: data.email, name: "Pedro Silva" },
        });
      }, 2000);
    });
  }
}
