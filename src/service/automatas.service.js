import { api } from "./api";

export class AutomatasService {
  static async createAutomata({ title, description, privacy, automata }) {
    return (
      await api.post("/automatas", {
        name: title,
        description,
        privacy,
        automata,
      })
    ).data;
  }
}
