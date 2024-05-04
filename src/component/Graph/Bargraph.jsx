import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import * as d3 from 'd3';
import "./Bargraph.css";


const BarChart = ({ data }) => {
  const svgRef = useRef();
  const [filteredData, setFilteredData] = useState(data);
  
  useEffect(() => {
    setFilteredData(data);
  }, [data]);
  
  useEffect(() => {
    renderGraph();
  }, [filteredData]);
  
  
  const renderGraph = () => {
    const svg = d3.select(svgRef.current);
    
    svg.selectAll('*').remove();
    
    if(data){
    const margin = { top: 20, right: 10, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(filteredData.map(d => d.sector))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.intensity)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, 's'))
      .call(g => g.select('.domain').remove())
      .call(g => g.select('.tick:last-of-type text').clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        );

    svg.append('g')
      .selectAll('rect')
      .data(filteredData)
      .join('rect')
      .attr('x', d => x(d.sector))
      .attr('y', d => y(d.intensity))
      .attr('height', d => y(0) - y(d.intensity))
      .attr('width', x.bandwidth())
      .attr('fill', 'steelblue');

    svg.append('g')
      .call(xAxis);

    svg.append('g')
      .call(yAxis);
  };

}

const handleFilter = (key, value) => {
  const filtered = data.filter(item => item[key] === value);
  setFilteredData(filtered);
};

  
  return (
    <div>
      <Box component="section" sx={{ p: 2 }}>
      <div className='Buttons'>
        <Button variant="contained" onClick={() => handleFilter("relevance", 6)}>Filter by Relevance: 6</Button>
        <Button variant="contained" onClick={() => handleFilter('topic', 'oil')}>Filter by Topic: Oil</Button>
        <Button variant="contained" onClick={() => handleFilter("likelihood", 3)}>Filter by Likelihood: 3</Button>
        <Button variant="contained" onClick={() => handleFilter("pestle", "Industries")}>Filter by Pestle</Button>
      </div>
      <div className='Graph'>
        <svg ref={svgRef} height={500} width={600}></svg>
      </div>
      </Box>
    </div>
  );
};


export default BarChart;
