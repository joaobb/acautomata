import {
  ArrowPathIcon,
  CheckIcon,
  PlayIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { type } from "@testing-library/user-event/dist/type";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { DFA } from "../../models/DFA";
import BaseInput from "../Base/Input";

import { Automata, parseGraphToAutomata } from "automata-logics-v2";

export default function AutomataTester({ graph }) {
  const [accepts, setAccepts] = useState(null);
  const [showRetry, setShowRetry] = useState(false);

  function testWord(ev) {
    ev.preventDefault();

    const parsedAutomata = parseGraphToAutomata(graph.save());

    const automata = new Automata(
      parsedAutomata.states,
      parsedAutomata.alphabet,
      parsedAutomata.transitions,
      parsedAutomata.initialState,
      parsedAutomata.acceptanceStates
    );

    const { testWord } = Object.fromEntries(new FormData(ev.target));
    if (typeof testWord !== "string") return;

    const accepts = automata.testWord(testWord).accepts;

    setAccepts(accepts);

    if (accepts) toast.success(`Palavra "${testWord}" reconhecida`);
    else toast.error(`Palavra "${testWord}" não reconhecida`);
  }

  function handleHover(ev, enterEvent) {
    if (accepts !== null) setShowRetry(enterEvent);
  }

  const acceptanceIcon = {
    true: <CheckIcon className={"w-5 h-5 inline text-white stroke-2"} />,
    false: <XMarkIcon className={"w-5 h-5 inline text-white stroke-2"} />,
    null: <PlayIcon className={"w-5 h-5 inline text-white stroke-2"} />,
  }[accepts];

  function handleResetAcceptance() {
    console.log("AA");
    if (accepts !== null) {
      setAccepts(null);
    }
  }

  return (
    <form onSubmit={testWord} className="test-form">
      <fieldset className={"flex gap-2"}>
        <legend className={"font-bold"}>Testar palavra</legend>
        <BaseInput
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
}
