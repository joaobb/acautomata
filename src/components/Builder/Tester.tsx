import {
  ArrowPathIcon,
  CheckIcon,
  PlayIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Automata, parseGraphToAutomata } from "automata-logics-v2";
import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Graph } from "@antv/g6";

interface AutomataTesterProps {
  graph: Graph;
}

const AutomataTester: React.FC<AutomataTesterProps> = ({ graph }) => {
  const [accepts, setAccepts] = useState<boolean | null>(null);
  const [showRetry, setShowRetry] = useState(false);

  function testWord(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    // @ts-ignore
    const parsedAutomata = parseGraphToAutomata(graph.save());

    const automata = new Automata(
      parsedAutomata.states,
      parsedAutomata.alphabet,
      parsedAutomata.transitions,
      parsedAutomata.initialState,
      parsedAutomata.acceptanceStates
    );

    // @ts-ignore
    const { testWord } = Object.fromEntries(new FormData(ev.target));
    if (typeof testWord !== "string") return;

    const accepts = Boolean(automata.testWord(testWord).accepts);

    setAccepts(accepts);

    if (accepts) toast.success(`Palavra "${testWord}" reconhecida`);
    else toast.error(`Palavra "${testWord}" não reconhecida`);
  }

  function handleHover(
    ev: React.MouseEvent<HTMLButtonElement>,
    isEnterEvent: boolean
  ) {
    if (accepts !== null) setShowRetry(isEnterEvent);
  }

  const acceptanceIcon = {
    true: <CheckIcon className={"w-5 h-5 inline text-white stroke-2"} />,
    false: <XMarkIcon className={"w-5 h-5 inline text-white stroke-2"} />,
    null: <PlayIcon className={"w-5 h-5 inline text-white stroke-2"} />,
  }[String(accepts)];

  function handleResetAcceptance() {
    if (accepts !== null) {
      setAccepts(null);
    }
  }

  return (
    <form onSubmit={testWord} className="test-form">
      <fieldset className={"flex gap-2"}>
        <legend className={"font-bold"}>Testar palavra</legend>
        <TextInput
          className={"w-full"}
          type="text"
          name="testWord"
          placeholder="Palavra"
          defaultValue="101"
          onInput={handleResetAcceptance}
        />
        <Button
          title={showRetry ? "Re-testar" : undefined}
          color={
            showRetry
              ? undefined
              : accepts
              ? "success"
              : accepts === false
              ? "failure"
              : undefined
          }
          type="submit"
          onMouseOver={(ev) => handleHover(ev, true)}
          onMouseOut={(ev) => handleHover(ev, false)}
          className={"transition-colors"}
        >
          {showRetry ? (
            <ArrowPathIcon className={"w-5 h-5 inline text-white stroke-2"} />
          ) : (
            acceptanceIcon
          )}
        </Button>
      </fieldset>
    </form>
  );
};

export default AutomataTester;
