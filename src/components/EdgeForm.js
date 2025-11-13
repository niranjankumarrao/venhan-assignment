import React, { useState } from 'react';

export default function EdgeForm({ nodes = [], onSubmit }) {
  const [source, setSource] = useState(nodes[0]?.id || '');
  const [target, setTarget] = useState(nodes[1]?.id || '');

  const handle = (e) => {
    e.preventDefault();
    if (!source || !target) {
      alert('choose source and target');
      return;
    }
    const id = `e${Date.now()}`;
    onSubmit({ id, source, target, type: 'smoothstep' });
  };

  return (
    <form className="form" onSubmit={handle}>
      <label>Source</label>
      <select value={source} onChange={(e) => setSource(e.target.value)}>
        <option value="">--select--</option>
        {nodes.map((n) => <option key={n.id} value={n.id}>{n.data?.label || n.id}</option>)}
      </select>

      <label>Target</label>
      <select value={target} onChange={(e) => setTarget(e.target.value)}>
        <option value="">--select--</option>
        {nodes.map((n) => <option key={n.id} value={n.id}>{n.data?.label || n.id}</option>)}
      </select>

      <button type="submit">Add Edge</button>
    </form>
  );
}
