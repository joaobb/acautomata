import React, { useState } from "react";
import AutomataBuilder from "../../components/Builder";
import "./index.css";

const SandboxPage = () => {
  const [graph, setGraph] = useState({});

  return (
    <div className="sandbox__container bg-gray-600">
      <div className={"py-6 px-10 rounded-lg"}>
        <AutomataBuilder
          heightOffset={0}
          graph={graph}
          onUpdateGraph={setGraph}
        />
      </div>
    </div>
  );
};

export default SandboxPage;
