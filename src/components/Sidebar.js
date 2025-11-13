import React, { useState } from 'react';
import NodeForm from './NodeForm';
import EdgeForm from './EdgeForm';

export default function Sidebar({ nodes, edges, onAddNode, onRemoveNode, onEditNode, onAddEdge, onRemoveEdge }) {
  const [showNodeForm, setShowNodeForm] = useState(false);
  const [showEdgeForm, setShowEdgeForm] = useState(false);

  return (
    <aside className="sidebar">
      <h2>Controls</h2>
      <div className="controls">
        <button onClick={() => setShowNodeForm((s) => !s)}>{showNodeForm ? 'Close Node Form' : 'Add Node'}</button>
        <button onClick={() => setShowEdgeForm((s) => !s)}>{showEdgeForm ? 'Close Edge Form' : 'Add Edge'}</button>
      </div>

      {showNodeForm && <NodeForm onSubmit={(n) => { onAddNode(n); setShowNodeForm(false); }} />}
      {showEdgeForm && <EdgeForm nodes={nodes} onSubmit={(e) => { onAddEdge(e); setShowEdgeForm(false); }} />}

      <hr />
      <div>
        <h3>Nodes</h3>
        <ul className="list">
          {nodes.map((n) => (
            <li key={n.id}>
              <strong>{n.data?.label || n.id}</strong>
              <div className="row">
                <button onClick={() => {
                  const label = prompt('Edit label', n.data?.label || '');
                  if (label !== null) onEditNode(n.id, { label });
                }}>Edit</button>
                <button onClick={() => onRemoveNode(n.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Edges</h3>
        <ul className="list">
          {edges.map((e) => (
            <li key={e.id}>
              {e.id}: {e.source} → {e.target}
              <div className="row"><button onClick={() => onRemoveEdge(e.id)}>Delete</button></div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
