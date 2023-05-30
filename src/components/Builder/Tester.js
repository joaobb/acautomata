import {
  ArrowPathIcon,
  CheckIcon,
  PlayIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { DFA } from "../../models/DFA";
import BaseInput from "../Base/Input";

export default function AutomataTester({ graph }) {
  const [accepts, setAccepts] = useState(null);
  const [showRetry, setShowRetry] = useState(false);

  function testWord(ev) {
    console.log(ev);
    ev.preventDefault();

    const { testWord } = Object.fromEntries(new FormData(ev.target));
    const automata = new DFA(graph.save());

    const accepts = automata.testWord(testWord).accepts;

    setAccepts(accepts);

    if (accepts) toast.success(`Palavra "${testWord}" aceita`);
    else toast.error(`Palavra "${testWord}" recusada`);
  }

  function handleHover(ev, enterEvent) {
    if (accepts !== null) setShowRetry(enterEvent);
  }

  const acceptanceIcon = {
    true: <CheckIcon className={"w-5 h-5 inline text-white stroke-2"} />,
    false: <XMarkIcon className={"w-5 h-5 inline text-white stroke-2"} />,
    null: <PlayIcon className={"w-5 h-5 inline text-white stroke-2"} />,
  }[accepts];

  return (
    <form onSubmit={testWord} className="test-form">
      <fieldset className={"flex gap-2"}>
        <legend className={"font-bold"}>Testar palavra</legend>
        <BaseInput
          type="text"
          name="testWord"
          placeholder="Palavra"
          defaultValue="101"
        />
        <Button
          title={showRetry ? "Re-testar" : undefined}
          color={
            accepts ? "success" : accepts === false ? "failure" : undefined
          }
          type="submit"
          onMouseOver={(ev) => handleHover(ev, true)}
          onMouseOut={(ev) => handleHover(ev, false)}
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
