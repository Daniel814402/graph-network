import React, { useState } from 'react';
import Graph from './Graph';

const App = () => {
  const [nodes, setNodes] = useState([
    { id: 1, x: 100, y: 100 },
    { id: 2, x: 300, y: 100 }
  ]);

  const [edges, setEdges] = useState([
    { id: 1, source: { id: 1, x: 100, y: 100 }, target: { id: 2, x: 300, y: 100 } }
  ]);

  const [nextNodeId, setNextNodeId] = useState(3);  // Track next unique node ID
  const [sourceNode, setSourceNode] = useState(null);  // Track the source node ID for adding edges
  const [targetNode, setTargetNode] = useState(null);  // Track the target node ID for adding edges
  const [nodeIdToRemove, setNodeIdToRemove] = useState('');
  const [edgeIdToRemove, setEdgeIdToRemove] = useState('');  // Simplified Edge ID removal

  // Add a new node with a unique ID
  const addNode = () => {
    const newNode = { id: nextNodeId, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight };
    setNodes([...nodes, newNode]);
    setNextNodeId(nextNodeId + 1);  // Increment next available node ID
  };

  // Add an edge between selected source and target nodes
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

  // Remove a node by ID
  const removeNode = () => {
    const id = parseInt(nodeIdToRemove);
    if (id) {
      setNodes(nodes.filter(node => node.id !== id));
      setEdges(edges.filter(edge => edge.source.id !== id && edge.target.id !== id));
    }
  };

  // Remove an edge by ID
  const removeEdge = () => {
    const edgeId = parseInt(edgeIdToRemove);
    if (edgeId) {
      setEdges(edges.filter(edge => edge.id !== edgeId));
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <h1>Interactive Graph</h1>

      {/* Adding and selecting nodes */}
      <div>
        <button onClick={addNode}>Add Node</button>
      </div>

      {/* Adding edges */}
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

      {/* Removing nodes */}
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

      {/* Removing edges */}
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
      <div >
      <Graph 
        nodes={nodes} 
        edges={edges} 
      />
    </div>
    </div >
  );
};

export default App;
