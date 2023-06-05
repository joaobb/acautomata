import { Button } from "flowbite-react";
import React from "react";
import { AntvG6Utils } from "../../utils/AntvG6";
import { loadGraph } from "../../utils/loadGraph";
import AutomataDebugger from "./Debugger";
import AutomataTester from "./Tester";

function AutomataUtilitiesSidebar({
  clearAutomata,
  showExtraButtons,
  rebalanceGraph,
  printTransitionTable,
  graph,
}) {
  return (
    <div className="flex flex-col w-full gap-4">
      <Button color={"failure"} className={"font-bold"} onClick={clearAutomata}>
        Limpar autômato
      </Button>

      {showExtraButtons && (
        <>
          <Button
            onClick={() => {
              loadGraph(graph);
              rebalanceGraph();
            }}
          >
            Load graph
          </Button>
          <Button
            onClick={() => console.log(AntvG6Utils.parseSave(graph.save()))}
          >
            Print graph
          </Button>

          <Button onClick={() => console.log(printTransitionTable())}>
            Print transition table
          </Button>
        </>
      )}

      <AutomataTester graph={graph} />

      <AutomataDebugger graph={graph} />
    </div>
  );
}

export { AutomataUtilitiesSidebar };
