import React, { useState } from 'react';

export default function NodeForm({ onSubmit }) {
  const [label, setLabel] = useState('');
  const [x, setX] = useState(200);
  const [y, setY] = useState(200);

  const handle = (e) => {
    e.preventDefault();
    const id = `${Date.now()}`;
    const node = { id, type: 'default', position: { x: Number(x), y: Number(y) }, data: { label: label || 'Node' } };
    onSubmit(node);
    setLabel('');
  };

  return (
    <form className="form" onSubmit={handle}>
      <label>Label</label>
      <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Node label" />
      <label>Position X</label>
      <input type="number" value={x} onChange={(e) => setX(e.target.value)} />
      <label>Position Y</label>
      <input type="number" value={y} onChange={(e) => setY(e.target.value)} />
      <button type="submit">Add Node</button>
    </form>
  );
}
