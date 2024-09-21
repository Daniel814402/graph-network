import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Graph = ({ nodes, edges }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 600;  // Fixed container width
    const height = 600;  // Fixed container height

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background-color', '#f0f0f0')  // Ensure background color
      .style('border', '2px solid black')  // Ensure container border
      .call(d3.zoom().on('zoom', (event) => {
        svg.attr('transform', event.transform);
      }));

    svg.selectAll("*").remove();  // Clear previous renders

    const container = svg.append('g');  // Group element to apply zoom transformations

    // Define zoom behavior with translateExtent to restrict zoom area and zoom around the cursor
    const zoom = d3.zoom()
      .scaleExtent([1, 3])  // Zoom limits
      .translateExtent([[0, 0], [width, height]])  // Keep zoom within bounds
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Draw edges (lines)
    container.selectAll('line')
      .data(edges)
      .enter()
      .append('line')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
      .style('stroke', 'black');

    // Draw nodes (circles)
    container.selectAll('circle')
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
            // Update node position
            d.x = event.x;
            d.y = event.y;
            d3.select(event.sourceEvent.target)
              .attr('cx', d.x)
              .attr('cy', d.y);
          
            // Update the edges that are connected to the dragged node
            container.selectAll('line')
              .attr('x1', edge => edge.source.id === d.id ? d.x : edge.source.x)
              .attr('y1', edge => edge.source.id === d.id ? d.y : edge.source.y)
              .attr('x2', edge => edge.target.id === d.id ? d.x : edge.target.x)
              .attr('y2', edge => edge.target.id === d.id ? d.y : edge.target.y);
          
            // Optionally, update edge labels too
            container.selectAll('.edge-label')
              .attr('x', edge => (edge.source.x + edge.target.x) / 2)
              .attr('y', edge => (edge.source.y + edge.target.y) / 2);
        }));

    // Add labels for nodes
    container.selectAll('.node-label')
      .data(nodes)
      .enter()
      .append('text')
      .attr('x', d => d.x + 12)  // Slight offset from node
      .attr('y', d => d.y + 5)
      .text(d => `Node ${d.id}`)
      .attr('class', 'node-label')
      .style('font-size', '12px')
      .style('fill', 'black');

    // Add labels for edges
    container.selectAll('.edge-label')
      .data(edges)
      .enter()
      .append('text')
      .attr('x', d => (d.source.x + d.target.x) / 2)
      .attr('y', d => (d.source.y + d.target.y) / 2)
      .text(d => `Edge ${d.id}`)
      .attr('class', 'edge-label')
      .style('font-size', '12px')
      .style('fill', 'red');

  }, [nodes, edges]);

  return (
    <div className="graph-container">
      <svg ref={svgRef}>
        <g></g>
      </svg>
    </div>
  );
};

export default Graph;
