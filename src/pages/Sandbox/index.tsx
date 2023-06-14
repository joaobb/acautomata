import React, { useState } from "react";
import AutomataBuilder from "../../components/Builder";
import "./index.css";
import { Graph } from "@antv/g6";

const SandboxPage: React.FC = () => {
  const [graph, setGraph] = useState<Graph | null>(null);

  return (
    <div className="sandbox__container bg-gray-600">
      <div className={"py-6 px-10 rounded-lg"}>
        <AutomataBuilder
          addPlaceholder
          heightOffset={0}
          graph={graph}
          onUpdateGraph={setGraph}
        />
      </div>
    </div>
  );
};

export default SandboxPage;
