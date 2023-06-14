import { Button } from "flowbite-react";
import React from "react";
import AutomataDebugger from "./Debugger";
import AutomataTester from "./Tester";
import { Graph } from "@antv/g6";

interface AutomataUtilitiesSidebarProps {
  graph: Graph;
  clearAutomata(): void;
}

const AutomataUtilitiesSidebar: React.FC<AutomataUtilitiesSidebarProps> = ({
  graph,
  clearAutomata,
}) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <Button color={"failure"} className={"font-bold"} onClick={clearAutomata}>
        Limpar autômato
      </Button>

      <AutomataTester graph={graph} />

      <AutomataDebugger graph={graph} />
    </div>
  );
};

export { AutomataUtilitiesSidebar };
