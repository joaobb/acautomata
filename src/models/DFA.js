import { LAMBDA_TRANSITION_LABEL } from "../enums/Automata";

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

  __getReachableStates(state, key) {
    return [
      ...(key ? this.transitions[state][key] : []),
      ...(this.transitions[state][LAMBDA_TRANSITION_LABEL] ?? []),
    ];
  }

  __getInitialPathStep() {
    const reachableStates = this.__getReachableStates(this.initialState);
    if (reachableStates.length) {
      return [
        [
          {
            key: LAMBDA_TRANSITION_LABEL,
            states: this.__getReachableStates(this.initialState),
          },
        ],
      ];
    }

    return [];
  }

  testWord(
    word,
    currentStates = [
      { state: this.initialState },
      ...this.__getReachableStates(this.initialState),
    ],
    path = this.__getInitialPathStep()
  ) {
    if (!word?.length) {
      return {
        accepts: currentStates.some((state) => {
          return this.acceptStates.includes(state.state);
        }),
        path: path || [],
      };
    }

    const currentKey = word.slice(0, 1);

    const step = [];

    const nextStates = currentStates.reduce((nextStates, state) => {
      const nextStepState = this.__getReachableStates(state.state, currentKey);

      step.push({
        key: currentKey,
        states: nextStepState,
      });

      return [...nextStates, ...(nextStepState ?? [])];
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
