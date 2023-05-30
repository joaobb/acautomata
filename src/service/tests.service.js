import { api } from "./api";

export class TestsService {
  static async fetchTests({ solved, authored }) {
    return (await api.get("/tests", { params: { solved, authored } })).data;
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
