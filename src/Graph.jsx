import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Graph = ({ nodes, edges }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const containerWidth = window.innerWidth - 40;  // Full window width, minus border padding
    const containerHeight = window.innerHeight - 120;  // Full window height, minus space for controls and border padding

    const svg = d3.select(svgRef.current)
      .attr('width', containerWidth)
      .attr('height', containerHeight);

    svg.selectAll("*").remove();  // Clear previous renders

    // Create zoom behavior
    const zoom = d3.zoom().on('zoom', (event) => {
      svg.attr("transform", event.transform);
    });

    svg.call(zoom);

    // Draw edges (lines)
    const edgeSelection = svg.selectAll('line')
      .data(edges)
      .enter()
      .append('line')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
      .style('stroke', 'black');

    // Add labels for edges (displaying edge ids)
    const edgeLabelSelection = svg.selectAll('.edge-label')
      .data(edges)
      .enter()
      .append('text')
      .attr('x', d => (d.source.x + d.target.x) / 2)
      .attr('y', d => (d.source.y + d.target.y) / 2)
      .text(d => `Edge ${d.id}`)
      .attr('class', 'edge-label')
      .style('font-size', '12px')
      .style('fill', 'red');

    // Draw nodes (circles)
    const nodeSelection = svg.selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 10)
      .style('fill', 'blue')
      .call(d3.drag()
        .on('start', (event, d) => {
          d3.select(event.sourceEvent.target).raise();
        })
        .on('drag', (event, d) => {
          // Ensure the node stays within the container bounds
          d.x = Math.max(10, Math.min(containerWidth - 10, event.x));
          d.y = Math.max(10, Math.min(containerHeight - 10, event.y));

          // Update node position
          d3.select(event.sourceEvent.target)
            .attr('cx', d.x)
            .attr('cy', d.y);

          // Update edge positions dynamically
          edgeSelection
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

          // Update edge labels dynamically
          edgeLabelSelection
            .attr('x', d => (d.source.x + d.target.x) / 2)
            .attr('y', d => (d.source.y + d.target.y) / 2);
        })
      );

    // Add labels for each node (showing the node's id)
    svg.selectAll('.node-label')
      .data(nodes)
      .enter()
      .append('text')
      .attr('x', d => d.x + 12)
      .attr('y', d => d.y + 5)
      .text(d => `Node ${d.id}`)
      .attr('class', 'node-label')
      .style('font-size', '12px')
      .style('fill', 'black');

  }, [nodes, edges]);

  return (
    <div className="graph-container">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Graph;
