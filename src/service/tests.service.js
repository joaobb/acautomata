import { api } from "./api";

export class TestsService {
  static async fetchTests({ solved, authored, pageSize, page }) {
    return (
      await api.get("/tests", {
        params: { solved, authored },
        headers: { "content-range": `${(page) * pageSize}-${pageSize}` },
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
