import PlayIcon from "@heroicons/react/24/outline/PlayIcon";
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
      <fieldset className={"flex gap-2 flex-col"}>
        <legend className={"font-bold"}>Passo-a-passo</legend>
        <form
          onSubmit={(ev) => handleDebug(ev)}
          className="flex gap-2 debug-form"
        >
          <BaseInput
            type="text"
            name="testWord"
            placeholder="Word"
            defaultValue="101"
          />
          <Button type="submit">
            <PlayIcon className={"w-5 h-5 inline text-white stroke-2"} />
          </Button>
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

          <div className={"flex"}>
            <Button onClick={() => handleStep(-1)} className={"rounded-r-none"}>
              <PlayIcon
                className={
                  "w-5 h-5 transform rotate-180 inline text-white stroke-2"
                }
              />
            </Button>
            <Button onClick={() => handleStep(+1)} className={"rounded-l-none"}>
              <PlayIcon className={"w-5 h-5 inline text-white stroke-2"} />
            </Button>
          </div>
        </div>
      </fieldset>
    </div>
  );
}

export default AutomataDebugger;
