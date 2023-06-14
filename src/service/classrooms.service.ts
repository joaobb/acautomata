import { api } from "./api";
import { Classroom } from "../interfaces/classroom";

export class ClassroomsService {
  static async fetchClasses(
    filters: { mentoredOnly?: boolean; name?: string } = {}
  ): Promise<{ classrooms: Classroom[]; count: number }> {
    return (
      await api.get("/classrooms", {
        params: { mentoredOnly: filters.mentoredOnly, name: filters.name },
      })
    ).data;
  }

  static async createClass(classroom: { name: string; description: string }) {
    return (
      await api.post(`/classrooms`, {
        name: classroom.name,
        description: classroom.description,
      })
    ).data;
  }

  static async joinClass({ invitationToken }: { invitationToken: string }) {
    return (await api.post(`/classrooms/join`, { invitationToken })).data;
  }
}
