import React, { useState } from "react";
import { DFA } from "../../models/DFA";

function AutomataDebugger({ graph }) {
  const [path, setPath] = useState([]);
  const [word, setWord] = useState("");
  const [step, setStep] = useState(0);

  function handleDebug(ev) {
    ev.preventDefault();

    const { testWord } = Object.fromEntries(new FormData(ev.target));
    setWord(String(testWord));

    const automata = new DFA(graph.save());
    setPath(automata.testWord(testWord).path);
  }

  function toggleActiveState(step, value) {
    path[step].forEach((branch) => {
      branch.states.forEach((state) => {
        graph.setItemState(state.path, "active", value);
      });
    });
  }

  function handleStep(diff) {
    const newStep = Math.max(Math.min(step + diff, word.length - 1), 0);

    toggleActiveState(step, false);
    setStep(newStep);
    toggleActiveState(newStep, true);
  }

  return (
    <div>
      <form onSubmit={(ev) => handleDebug(ev)} className="test-form">
        <fieldset>
          <legend>Debugger</legend>
          <input
            type="text"
            name="testWord"
            placeholder="Word"
            defaultValue="101"
          />
          <button type="submit">Debug</button>
        </fieldset>
      </form>

      <div>
        <p className="debug-word">
          {word.split("").map((char, $index) => (
            <span
              key={`test-word-char-#${$index}=${char}`}
              style={{ color: step === $index ? "red" : undefined }}
            >
              {char}
            </span>
          ))}
        </p>

        <button onClick={() => handleStep(-1)}>-</button>
        <button onClick={() => handleStep(+1)}>+</button>
      </div>
    </div>
  );
}

export default AutomataDebugger;
