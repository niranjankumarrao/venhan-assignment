import React, { useEffect, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import Diagram from './components/Diagram';
import Sidebar from './components/Sidebar';
import metadata from './metadata.json';

// Simple, readable app code written in a beginner-friendly style.
export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // load metadata or saved state
  useEffect(() => {
    try {
      const saved = localStorage.getItem('venhan-diagram');
      if (saved) {
        const parsed = JSON.parse(saved);
        setNodes(parsed.nodes || metadata.nodes);
        setEdges(parsed.edges || metadata.edges);
        return;
      }
    } catch (e) {
      // ignore and fall back to metadata
    }
    setNodes(metadata.nodes);
    setEdges(metadata.edges);
  }, []);

  // save on change
  useEffect(() => {
    try {
      localStorage.setItem('venhan-diagram', JSON.stringify({ nodes, edges }));
    } catch (e) {
      // ignore storage errors
    }
  }, [nodes, edges]);

  const addNode = (node) => {
    setNodes((prev) => [...prev, node]);
  };

  const removeNode = (id) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
    setEdges((prev) => prev.filter((e) => e.source !== id && e.target !== id));
  };

  const editNode = (id, data) => {
    setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...data } } : n)));
  };

  const addEdge = (edge) => {
    setEdges((prev) => [...prev, edge]);
  };

  const removeEdge = (id) => {
    setEdges((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <ReactFlowProvider>
      <div className="app-root">
        <Sidebar
          nodes={nodes}
          edges={edges}
          onAddNode={addNode}
          onRemoveNode={removeNode}
          onEditNode={editNode}
          onAddEdge={addEdge}
          onRemoveEdge={removeEdge}
        />
        <Diagram
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
        />
      </div>
    </ReactFlowProvider>
  );
}
