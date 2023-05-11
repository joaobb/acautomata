import React from "react";
import { DFA } from "../../models/DFA";
import BaseButton from "../Base/Button";
import BaseInput from "../Base/Input";
import { Button } from "flowbite-react";

export default function AutomataTester({ graph }) {
  function testWord(ev) {
    ev.preventDefault();

    const { testWord } = Object.fromEntries(new FormData(ev.target));
    const automata = new DFA(graph.save());

    return automata.testWord(testWord).accepts;
  }

  return (
    <form
      onSubmit={(ev) => alert("Accepted: " + testWord(ev))}
      className="test-form"
    >
      <fieldset>
        <legend>Test</legend>
        <BaseInput
          type="text"
          name="testWord"
          placeholder="Word"
          defaultValue="101"
        />
        <Button type="submit">Test word</Button>
      </fieldset>
    </form>
  );
}
