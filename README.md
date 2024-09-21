# React Graph Network with D3.js

This project is a simple interactive graph network built using React and D3.js. It allows users to visualize a dynamic network of nodes (representing entities) and edges (representing relationships between those entities). Users can add, remove, and move nodes and edges interactively.

# Features

* Interactive Visualization: Drag nodes around to reposition them.
* Add/Remove Nodes: Add new nodes to the graph.
* Add/Remove Edges: Connect nodes by adding edges or remove existing connections.
* Zoom and Pan: Use mouse interactions to zoom in and out of the graph.
* D3-based Rendering: D3.js is used for rendering the graph, providing a robust and scalable visualization.
* Dynamic Labeling: Node and edge labels are automatically updated and displayed.

# Technologies Used

* React: A JavaScript library for building user interfaces.
* D3.js: A powerful data visualization library used for rendering the graph and handling drag, zoom, and pan events.
* CSS: For styling the application.

# Installation

To run this project locally, follow these steps:

1. Clone the repository:
```
git clone https://github.com/your-username/react-graph-network.git
```

2. Navigate to the project directory:
```
cd react-graph-network
```

3. Install dependencies:
```
npm install
```

4. Run the development server:
```
npm start
```

The app will be available at http://localhost:3000.
---

# Usage

1. Adding a Node:
 * Click on the "Add Node" button. A new node will be added to the graph in a random position.

2. Adding an Edge:
 * Enter the source node ID and target node ID in the input fields provided under the "Add Edge" section.
 * Click the "Add Edge" button to create an edge between the two nodes.

3. Removing a Node:
 * Enter the ID of the node you wish to remove in the "Remove Node" section.
 * Click the "Remove Node" button. The selected node and any connected edges will be removed.

4. Removing an Edge:
 * Enter the ID of the edge you want to remove in the "Remove Edge" section.
 * Click the "Remove Edge" button to delete the selected edge.

5. Dragging Nodes:
 * Click and drag a node to move it around the graph. The edges connected to the node will automatically update their position.

6. Zooming and Panning:
 * Use the mouse scroll wheel to zoom in or out.
 * Click and drag anywhere on the background to pan across the graph.

# Customization

* Nodes and Edges: You can modify the appearance and behavior of nodes and edges by updating the Graph.jsx file. Customize the colors, sizes, and more by adjusting the D3.js code within the useEffect hook.
* UI Styling: Modify the style.css file to change the appearance of the UI controls or the graph container.

# Known Issues/Limitations

* Node Overlap: When adding multiple nodes, there is no automatic spacing or collision detection. You may need to manually adjust node positions by dragging them.
* Edge Labels: Edge labels might overlap if nodes are too close to each other.
* Linking after drag: After dragging the nodes to a desire location, the edges may detached from the node. Moreover, when clicking on any button available on the window, the edges will reset to its initial state.
* Addition of Nodes: Nodes added are generated at random positions in the container. Unable to select a desired position to add a node.

# Future Improvements

* Node Editing: Add functionality to edit existing node or edge attributes.
* Force-Directed Layout: Implement a force-directed graph layout to automatically space out nodes for better visualization.
* Node/Edge Tooltips: Add tooltips to show additional data when hovering over nodes or edges.
* Better Node Additions: Able to select where or how to add in the nodes.
* Linking: The edges between the nodes will remain intact even after dragging the nodes.

# Contributing

Contributions are welcome! Feel free to provide feedbacks, submit issues or pull requests for any bug fixes or feature improvements.

# Contact

For any questions or feedback, please contact:
* Name: Daniel
* Email: danielchia39@gmail.com