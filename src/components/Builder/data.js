import G6 from "@antv/g6";
import {
  ACCEPTANCE_STATE_NAME,
  INITIAL_STATE_NAME,
} from "../../enums/automata";

const baseAutomataData = {
  nodes: [
    { id: "node-0", label: "q1", isInitial: true },
    {
      id: "node-1",
      label: "q2",
      isAcceptance: true,
    },
  ],
  edges: [
    { source: "node-0", target: "node-0", label: "0" },
    { source: "node-0", target: "node-1", label: "1" },
    { source: "node-1", target: "node-1", label: "1" },
    { source: "node-1", target: "node-0", label: "0" },
  ],
};

export { baseAutomataData };
