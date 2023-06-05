import { CheckIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import PlayIcon from "@heroicons/react/24/outline/PlayIcon";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { LAMBDA_TRANSITION_LABEL } from "../../enums/Automata";
import { Button, TextInput } from "flowbite-react";

import { Automata, parseGraphToAutomata } from "automata-logics-v2";

function AutomataDebugger({ graph }) {
  const [wordTestResult, setWordTestResult] = useState({
    accepts: false,
    path: [],
  });

  const [word, setWord] = useState("");
  const [step, setStep] = useState(0);

  const [debugMode, setDebugMode] = useState(false);

  function handleDebug(ev) {
    ev.preventDefault();
    try {
      const { testWord } = Object.fromEntries(new FormData(ev.target));

      if (typeof testWord !== "string") return;

      const graphPayload = graph.save();

      if (!graphPayload.edges.length) {
        toast.error("Ops!\nAcho que você esqueceu de construir o autômato");
        throw new Error("Automata wasn't defined correctly");
      }

      const parsedAutomata = parseGraphToAutomata(graphPayload);

      const automata = new Automata(
        parsedAutomata.states,
        parsedAutomata.alphabet,
        parsedAutomata.transitions,
        parsedAutomata.initialState,
        parsedAutomata.acceptanceStates
      );

      const wordTest = automata.testWord(testWord);

      const parsedPath = wordTest.path.reduce((result, step, index) => {
        const stepTransitions = step
          .map((transition) => transition.id)
          .filter(Boolean);

        if (stepTransitions.filter(Boolean).length) {
          result.push({
            key: !index ? LAMBDA_TRANSITION_LABEL : testWord[index - 1],
            transitions: stepTransitions,
          });
        }
        return result;
      }, []);

      setWordTestResult({ accepts: wordTest.accepts, path: parsedPath });

      setWord(testWord);

      parsedPath[0]?.transitions.forEach((transition) =>
        graph.setItemState(transition, "active", true)
      );

      setDebugMode(true);
    } catch (error) {
      console.error(error);
    }
  }

  function clearDebugger() {
    setDebugMode(false);
    graph.save()?.edges.forEach((edge) => {
      graph.setItemState(edge.id, "active", false);
    });
    setWord("");
    setStep(0);
    setWordTestResult({ accepts: false, path: [] });
  }

  function toggleActiveState(step, value) {
    wordTestResult.path[step]?.transitions.forEach((transition) => {
      if (transition) graph.setItemState(transition, "active", value);
    });
  }

  function handleStep(diff) {
    toggleActiveState(step, false);

    const nextStep = Math.max(Math.min(step + diff, word.length - 1), 0);
    setStep(nextStep);
    toggleActiveState(nextStep, true);

    if (nextStep === word.length - 1) {
      if (wordTestResult.accepts)
        toast.success("O automato reconhece a palavra");
      else toast.error("O automato não reconhece a palavra");
    }
  }

  const isFirstStep = step === 0;
  const isLastStep = step === word.length - 1;

  return (
    <div>
      <fieldset className={"flex gap-2 flex-col"}>
        <legend className={"font-bold"}>Passo-a-passo</legend>
        {!debugMode ? (
          <form
            onSubmit={(ev) => handleDebug(ev)}
            className="flex gap-2 debug-form"
          >
            <TextInput
              className={"w-full"}
              type="text"
              name="testWord"
              placeholder="Palavra"
              defaultValue="101"
              onInput={clearDebugger}
            />
            <Button type="submit" className={"text-white"}>
              <PlayIcon className={"w-5 h-5 inline stroke-2"} />
            </Button>
          </form>
        ) : (
          <div className={"flex flex-col"}>
            <div className={"flex bg-white rounded-t-lg"}>
              <p className="debug-word text-gray-800 px-4 py-2">
                {word.split("").map((char, $index) => (
                  <span
                    key={`test-word-char-#${$index}=${char}`}
                    className={
                      step === $index
                        ? "text-red-700 font-bold"
                        : "text-gray-800"
                    }
                  >
                    {char}
                  </span>
                ))}
              </p>

              <Button
                color={"dark"}
                onClick={clearDebugger}
                className={"rounded-none rounded-tr-lg ml-auto text-white"}
              >
                <XCircleIcon
                  className={"w-5 h-5 transform rotate-180 stroke-2"}
                />
              </Button>
            </div>

            <div className={"flex w-full"}>
              <Button
                disabled={isFirstStep}
                onClick={() => handleStep(-1)}
                className={
                  "flex-grow rounded-t-none rounded-br-none text-white"
                }
              >
                <PlayIcon className={"w-5 h-5 transform rotate-180 stroke-2"} />
              </Button>

              {!isLastStep ? (
                <Button
                  onClick={() => handleStep(+1)}
                  className={
                    "flex-grow rounded-t-none rounded-bl-none text-white"
                  }
                >
                  {!isLastStep ? (
                    <PlayIcon className={"w-5 h-5 stroke-2"} />
                  ) : (
                    <CheckIcon className={"w-5 h-5 stroke-2"} />
                  )}
                </Button>
              ) : (
                <Button
                  disabled
                  color={wordTestResult.accepts ? "success" : "failure"}
                  className={
                    "flex-grow rounded-t-none rounded-bl-none text-white"
                  }
                >
                  {wordTestResult.accepts ? (
                    <CheckIcon className={"w-5 h-5 stroke-2"} />
                  ) : (
                    <XMarkIcon className={"w-5 h-5 stroke-2"} />
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </fieldset>
    </div>
  );
}

export default AutomataDebugger;
