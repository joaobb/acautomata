import { api } from "./api";

export class TestsService {
  static async fetchTests({ solved }) {
    return (await api.get("/tests", { params: { solved } })).data;
  }
}
