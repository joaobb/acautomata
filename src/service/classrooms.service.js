import { api } from "./api";

export class ClassroomsService {
  static async fetchClasses({ mentoredOnly, name } = {}) {
    return (await api.get("/classrooms", { params: { mentoredOnly, name } })).data;
  }

  static async createClass({ name, description }) {
    return (await api.post(`/classrooms`, { name, description })).data;
  }

  static async joinClass({ invitationToken }) {
    return (await api.post(`/classrooms/join`, { invitationToken })).data;
  }
}
