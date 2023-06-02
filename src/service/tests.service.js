import { PAGINATION_PAGE_SIZE } from "../enums/Pagination";
import { api } from "./api";

export class TestsService {
  static async fetchTests({
    solved,
    authored,
    classroom,
    name,
    pageSize = PAGINATION_PAGE_SIZE,
    offset = 0,
  }) {
    return (
      await api.get("/tests", {
        params: {
          solved,
          authored: authored || undefined,
          name: name || undefined,
          classroom: classroom || undefined,
        },
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

  static async createExercise({
    title,
    description,
    automatas,
    privacy,
    classroomPrivate,
  }) {
    return (
      await api.post(`/tests`, {
        name: title,
        description,
        automatas,
        privacy,
        classroomPrivate,
      })
    ).data;
  }

  static async fetchTestSubmissions({
    exerciseId,
    pageSize = PAGINATION_PAGE_SIZE,
    offset = 0,
  }) {
    return (
      await api.get(`/tests/${exerciseId}/submissions`, {
        headers: { "content-range": `${offset}-${pageSize}` },
      })
    ).data;
  }
}
