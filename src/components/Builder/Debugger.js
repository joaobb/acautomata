import React, { useState } from "react";
import { DFA } from "../../models/DFA";
import BaseInput from "../Base/Input";
import { Button } from "flowbite-react";

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
    path[step]?.forEach((branch) => {
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
      <fieldset className={'flex gap-2 flex-col'}>
        <legend>Debugger</legend>
        <form onSubmit={(ev) => handleDebug(ev)} className="flex gap-4 debug-form">
          <BaseInput
            type="text"
            name="testWord"
            placeholder="Word"
            defaultValue="101"
          />
          <Button type="submit">Debug</Button>
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

          <div className={"flex gap-4"}>
            <Button onClick={() => handleStep(-1)}>-</Button>
            <Button onClick={() => handleStep(+1)}>+</Button>
          </div>
        </div>
      </fieldset>
    </div>
  );
}

export default AutomataDebugger;
