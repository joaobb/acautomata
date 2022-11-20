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
    graphInstance.refresh();
  } catch (err) {
    alert("Ops! Ocorreu um problema ao carregar o automato: " + err.message);
  }
}

export { loadGraph };
