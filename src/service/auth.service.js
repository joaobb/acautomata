import { api } from "./api";

export class AuthService {
  static async login({ email, password }) {
    return (await api.post("/login", { email, password })).data?.access_token;
  }
  static async logout({ email, password }) {
    return (await api.post("/logout", { email, password })).data;
  }
}
