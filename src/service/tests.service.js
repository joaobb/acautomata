import { api } from "./api";

export class TestsService {
  static async fetchTests() {
    return (await api.get("/tests")).data;
  }
}
