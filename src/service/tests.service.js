import { PAGINATION_PAGE_SIZE } from "../enums/Pagination";
import { api } from "./api";

export class TestsService {
  static async fetchTests({
    solved,
    authored,
    name,
    pageSize = PAGINATION_PAGE_SIZE,
    offset = 0,
  }) {
    return (
      await api.get("/tests", {
        params: { solved, authored, name: name || undefined },
        headers: { "content-range": `${offset}-${pageSize}` },
      })
    ).data;
  }

  static async fetchTestById({ exerciseId }) {
    return (await api.get(`/tests/${exerciseId}`)).data;
  }

  static async submitAnswer({ exerciseId, answer }) {
    return (await api.post(`/tests/${exerciseId}/answer`, { answer })).data;
  }

  static async createExercise({ title, description, automatas, privacy }) {
    return (
      await api.post(`/tests`, {
        name: title,
        description,
        automatas,
        privacy,
      })
    ).data;
  }
}
