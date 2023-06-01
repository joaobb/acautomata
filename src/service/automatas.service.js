import { api } from "./api";

export class AutomatasService {
  static async createAutomata({ title, description, automata, privacy }) {
    return (
      await api.post("/automatas", {
        name: title,
        description,
        automata,
        privacy,
      })
    ).data;
  }
}
