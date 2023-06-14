import { api } from "./api";
import { User, UserCredentials } from "../interfaces/user";

export class AuthService {
  static async signUp({
    name,
    email,
    password,
    role,
  }: User): Promise<Partial<User>> {
    return (await api.post("/users", { name, email, password, role })).data;
  }

  static async login(credentials: UserCredentials): Promise<Partial<User>> {
    return (await api.post("/login", credentials)).data;
  }
}
