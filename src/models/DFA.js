class DFA {
  states = [];
  alphabet = [];
  transitions = {};
  initialState = undefined;
  acceptStates = [];

  constructor(graph) {
    const { states, alphabet, transitions, initialState, acceptStates } =
      this.__parseGraph(graph);

    this.states = states;
    this.alphabet = alphabet;
    this.transitions = transitions;
    this.initialState = initialState;
    this.acceptStates = acceptStates;
  }

  testWord(word, currentStates = [{ state: this.initialState }], path = []) {
    if (!word?.length) {
      return {
        accepts: currentStates.some((state) => {
          return this.acceptStates.includes(state.state);
        }),
        path,
      };
    }

    const currentKey = word.slice(0, 1);

    const step = [];

    const nextStates = currentStates.reduce((nextStates, state) => {
      step.push({
        key: currentKey,
        states: this.transitions[state.state][currentKey],
      });

      return [
        ...nextStates,
        ...(this.transitions[state.state][currentKey] ?? []),
      ];
    }, []);
    path.push(step);

    return this.testWord(word.slice(1), nextStates, path);
  }

  __parseGraph(graph) {
    let states = [],
      alphabet = [],
      transitions = {},
      acceptStates = [],
      initialState;

    graph.nodes.forEach((node) => {
      if (!states.includes(node.id)) states.push(node.id);
      if (node.isInitial) initialState = node.id;
      if (node.isAcceptance && !acceptStates.includes(node.id)) {
        acceptStates.push(node.id);
      }
    });

    alphabet = graph.edges.reduce((alphabet, edge) => {
      if (!alphabet.includes(edge.label)) alphabet.push(edge);
      return alphabet;
    }, []);

    transitions = this.__getTransitionTableFrom(graph);

    return {
      states,
      alphabet,
      transitions,
      initialState,
      acceptStates,
    };
  }

  __getTransitionRow(nodeId, edges) {
    return edges.reduce((result, edge) => {
      if (edge.source === nodeId) {
        if (!result[edge.label]) result[edge.label] = [];

        result[edge.label].push({ state: edge.target, path: edge.id });
      }

      return result;
    }, {});
  }

  __getTransitionTableFrom(graph) {
    return graph.nodes.reduce(
      (result, node) => ({
        ...result,
        [node.id]: this.__getTransitionRow(node.id, graph.edges),
      }),
      {}
    );
  }
}

export { DFA };
