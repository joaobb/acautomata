const baseAutomataData = {
  nodes: [
    { id: "node-1", label: "q1", isInitial: true },
    {
      id: "node-2",
      label: "q2",
      isAcceptance: true,
    },
  ],
  edges: [
    { id: "edge-1-1-#0", source: "node-1", target: "node-1", label: "0" },
    { id: "edge-1-1-#1", source: "node-1", target: "node-1", label: "1" },
    { id: "edge-1-2-#1", source: "node-1", target: "node-2", label: "1" },
    { id: "edge-2-2-#1", source: "node-2", target: "node-2", label: "1" },
    { id: "edge-2-1-#0", source: "node-2", target: "node-1", label: "0" },
    { id: "edge-1-2-#ε", source: "node-1", target: "node-2", label: "ε" },
  ],
};

export { baseAutomataData };
