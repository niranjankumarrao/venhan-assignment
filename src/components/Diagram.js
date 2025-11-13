import React from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';

export default function Diagram({ nodes, edges, setNodes, setEdges }) {
  // basic handlers that React Flow expects for editable flows
  const onNodesChange = (changes) => {
    // apply basic changes manually for simplicity
    setNodes((nds) => {
      let copy = [...nds];
      changes.forEach((c) => {
        if (c.type === 'remove') {
          copy = copy.filter((n) => n.id !== c.id);
        } else if (c.type === 'reset') {
          copy = c.items || copy;
        } else if (c.type === 'position') {
          copy = copy.map((n) => (n.id === c.id ? { ...n, position: c.position } : n));
        }
      });
      return copy;
    });
  };

  const onEdgesChange = (changes) => {
    setEdges((eds) => {
      let copy = [...eds];
      changes.forEach((c) => {
        if (c.type === 'remove') copy = copy.filter((e) => e.id !== c.id);
      });
      return copy;
    });
  };

  const onConnect = (connection) => {
    const id = `e${Date.now()}`;
    const newEdge = { id, source: connection.source, target: connection.target, type: 'smoothstep' };
    setEdges((eds) => [...eds, newEdge]);
  };

  return (
    <div className="diagram-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
}
