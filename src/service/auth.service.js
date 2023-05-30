import { api } from "./api";

export class AuthService {
  static async signUp({ name, email, password, role }) {
    return (await api.post("/users", { name, email, password, role })).data;
  }
  static async login({ email, password }) {
    return (await api.post("/login", { email, password })).data;
  }
  static async logout({ email, password }) {
    return (await api.post("/logout", { email, password })).data;
  }
}
