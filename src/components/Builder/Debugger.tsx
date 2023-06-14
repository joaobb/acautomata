import { CheckIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import PlayIcon from "@heroicons/react/24/outline/PlayIcon";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { LAMBDA_TRANSITION_LABEL } from "../../enums/Automata";
import { Button, TextInput } from "flowbite-react";

import { Automata, parseGraphToAutomata } from "automata-logics-v2";
import { EdgeConfig, Graph, GraphData } from "@antv/g6";
import { Transition } from "automata-logics-v2/src/definitions/Automata";

interface AutomataDebuggerProps {
  graph: Graph;
}

type TestPath = { key: string; transitions: Transition[] }[];

interface WordTest {
  accepts: boolean;
  path: TestPath;
  keysSteps: string[];
}

const AutomataDebugger: React.FC<AutomataDebuggerProps> = ({ graph }) => {
  const [wordTestResult, setWordTestResult] = useState<WordTest>({
    accepts: false,
    path: [],
    keysSteps: [],
  });

  const [step, setStep] = useState(0);

  const [debugMode, setDebugMode] = useState(false);

  function handleDebug(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    try {
      const { testWord } = Object.fromEntries(
        new FormData(ev.target as HTMLFormElement)
      );

      if (typeof testWord !== "string") return;

      const graphPayload: GraphData = graph.save();

      if (!(graphPayload.edges as EdgeConfig[]).length) {
        toast.error("Ops!\nAcho que você esqueceu de construir o autômato");
        throw new Error("Automata wasn't defined correctly");
      }

      // @ts-ignore
      const parsedPayload = parseGraphToAutomata(graphPayload);

      const automata = new Automata(
        parsedPayload.states,
        parsedPayload.alphabet,
        parsedPayload.transitions,
        parsedPayload.initialState,
        parsedPayload.acceptanceStates
      );

      const wordTest = automata.testWord(testWord);
      // Remove initial state transition
      const clearedPath =
        wordTest.path?.reduce((path: TestPath, step) => {
          const clearedStep = {
            key: step.key,
            transitions: step.transitions.filter((transition) => transition.id),
          };

          if (clearedStep.transitions.length) path.push(clearedStep);

          return path;
        }, []) || [];

      const keysSteps = clearedPath.map((step) =>
        step.key === LAMBDA_TRANSITION_LABEL ? "_" : step.key
      );

      setWordTestResult({
        accepts: Boolean(wordTest.accepts),
        path: clearedPath,
        keysSteps: keysSteps,
      });

      toggleActiveState(0, true, clearedPath);

      setDebugMode(true);
    } catch (error) {
      console.error(error);
    }
  }

  function clearDebugger() {
    setDebugMode(false);
    (graph.save()?.edges as EdgeConfig[]).forEach((edge) => {
      if (!edge.id) return;
      graph.setItemState(edge.id, "active", false);
    });
    setStep(0);
    setWordTestResult({ accepts: false, path: [], keysSteps: [] });
  }

  function toggleActiveState(
    step: number,
    value: boolean,
    path = wordTestResult.path
  ) {
    path[step]?.transitions.forEach((transition) => {
      if (transition?.id) graph.setItemState(transition.id, "active", value);
    });
  }

  function handleStep(diff: number) {
    toggleActiveState(step, false);

    const keysStepsCount = wordTestResult.keysSteps.length;

    const nextStep = Math.max(Math.min(step + diff, keysStepsCount - 1), 0);
    setStep(nextStep);
    toggleActiveState(nextStep, true);

    if (nextStep === keysStepsCount - 1) {
      if (wordTestResult.accepts)
        toast.success("O automato reconhece a palavra");
      else toast.error("O automato não reconhece a palavra");
    }
  }

  const isFirstStep = step === 0;
  const isLastStep = step === wordTestResult.keysSteps.length - 1;

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
                {wordTestResult.keysSteps.map((key, $index) => (
                  <span
                    key={`test-word-char-#${$index}=${key}`}
                    className={
                      step === $index
                        ? "text-red-700 font-bold"
                        : "text-gray-800"
                    }
                  >
                    {key}
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
};

export default AutomataDebugger;
