import React from "react";
import { DFA } from "../../models/DFA";

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
        <input
          type="text"
          name="testWord"
          placeholder="Word"
          defaultValue="101"
        />
        <button type="submit">Test word</button>
      </fieldset>
    </form>
  );
}
