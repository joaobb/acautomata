import { api } from "./api";

export class AutomatasService {
  static async createAutomata(payload: {
    title: string;
    description: string;
    automata: any;
    privacy: string;
  }) {
    return (
      await api.post("/automatas", {
        name: payload.title,
        description: payload.description,
        automata: payload.automata,
        privacy: payload.privacy,
      })
    ).data;
  }
}
