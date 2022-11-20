function loadGraph(graphInstance) {
  const payload = prompt("Graph");

  try {
    const parsedPayload = JSON.parse(payload);

    graphInstance.data({
      nodes: parsedPayload.nodes,
      edges: parsedPayload.edges.map((edge) => ({
        ...edge,
        type:
          edge.source === edge.target ? "loop" : "actiavableEdge" || edge.type,
      })),
    });

    graphInstance.render();

    parsedPayload.nodes.forEach((node) => {
      if (node.isInitial)
        graphInstance.findById(node.id)?.setState("isInitial", true);

      if (node.isAcceptance)
        graphInstance.findById(node.id)?.setState("isAcceptance", true);
    });
  } catch (err) {
    alert("Ops! Ocorreu um problema ao carregar o automato: " + err.message);
  }
}

export { loadGraph };
