import React, { useState } from 'react';
import Graph from './Graph';
import './style.css';  // Import the CSS

const App = () => {
  const [nodes, setNodes] = useState([
    { id: 1, x: 100, y: 100 },
    { id: 2, x: 300, y: 100 }
  ]);

  const [edges, setEdges] = useState([
    { id: 1, source: { id: 1, x: 100, y: 100 }, target: { id: 2, x: 300, y: 100 } }
  ]);

  const [nextNodeId, setNextNodeId] = useState(3);
  const [sourceNode, setSourceNode] = useState(null);
  const [targetNode, setTargetNode] = useState(null);
  const [nodeIdToRemove, setNodeIdToRemove] = useState('');
  const [edgeIdToRemove, setEdgeIdToRemove] = useState('');

  const addNode = () => {
    const newNode = { id: nextNodeId, x: Math.random() * 400, y: Math.random() * 400 };
    setNodes([...nodes, newNode]);
    setNextNodeId(nextNodeId + 1);
  };

  const addEdge = () => {
    if (sourceNode && targetNode && sourceNode !== targetNode) {
      const source = nodes.find(node => node.id === parseInt(sourceNode));
      const target = nodes.find(node => node.id === parseInt(targetNode));

      if (source && target) {
        const newEdge = { id: edges.length + 1, source, target };
        setEdges([...edges, newEdge]);
      }
    }
  };

  const removeNode = () => {
    const id = parseInt(nodeIdToRemove);
    if (id) {
      setNodes(nodes.filter(node => node.id !== id));
      setEdges(edges.filter(edge => edge.source.id !== id && edge.target.id !== id));
    }
  };

  const removeEdge = () => {
    const edgeId = parseInt(edgeIdToRemove);
    if (edgeId) {
      setEdges(edges.filter(edge => edge.id !== edgeId));
    }
  };

  return (
    <div style={{ height: '100vh', padding: '20px' }}>
      <h1>Interactive Graph</h1>

      <div className="ui-controls">
        <button onClick={addNode}>Add Node</button>

        <div>
          <h3>Add Edge</h3>
          <input
            type="number"
            placeholder="Source Node ID"
            value={sourceNode || ''}
            onChange={(e) => setSourceNode(e.target.value)}
          />
          <input
            type="number"
            placeholder="Target Node ID"
            value={targetNode || ''}
            onChange={(e) => setTargetNode(e.target.value)}
          />
          <button onClick={addEdge}>Add Edge</button>
        </div>

        <div>
          <h3>Remove Node</h3>
          <input
            type="number"
            placeholder="Node ID to Remove"
            value={nodeIdToRemove}
            onChange={(e) => setNodeIdToRemove(e.target.value)}
          />
          <button onClick={removeNode}>Remove Node</button>
        </div>

        <div>
          <h3>Remove Edge</h3>
          <input
            type="number"
            placeholder="Edge ID to Remove"
            value={edgeIdToRemove}
            onChange={(e) => setEdgeIdToRemove(e.target.value)}
          />
          <button onClick={removeEdge}>Remove Edge</button>
        </div>
      </div>

      <Graph nodes={nodes} edges={edges} />
    </div>
  );
};

export default App;
