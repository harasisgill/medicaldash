import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const GaugeChart = ({ value, title, range }) => {
  const svgRef = useRef();
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Set up the dimensions and margins of the graph
    const width = 350;
    const height = 250;
    const margin = 30;
    const radius = Math.min(width, height) / 2 - margin;

    // Remove previous drawings
    svg.selectAll("*").remove();

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", margin / 2)
      .attr("text-anchor", "middle")
      .style("fill", "black")
      .style("font-size", "15px")
      .text(title);

    // Create the arc for the gauge
    const arc = d3.arc()
      .innerRadius(radius - 25)
      .outerRadius(radius * 1.05)
      .startAngle(-Math.PI / 2);

    // Create the scale for the gauge
    const scale = d3.scaleLinear()
      .domain([0, 100])
      .range([-Math.PI / 2, Math.PI / 2]);

    // Create the gauge
    const gauge = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Draw background arc
    gauge.append("path")
      .datum({ endAngle: Math.PI / 2 })
      .style("fill", "#ddd")
      .attr("d", arc);

    // Add animated gauge
    const foreground = gauge.append("path")
      .datum({ endAngle: -Math.PI / 2 })
      .style("fill", (d) => {
        if (value >= range[0] && value < range[1]) return "#fcba03";
        else if (value < range[0]) return "red";
        else if (value >= range[1] && value < range[2]) return "green";
        else if (value >= range[2] && value < range[3]) return "#fcba03";
        else if (value >= range[3]) return "red";
      });

    foreground.transition()
      .duration(750)
      .attrTween("d", (d) => {
        const interpolate = d3.interpolate(d.endAngle, scale(100));
        return (t) => {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      });

    // Add text inside the gauge
    gauge.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.40em")
      .style("fill", "black")
      .style("font-size", "30px")
      .text(value);

    // Add range text below the gauge
    if (showText) {
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2 + margin / 2)
        .attr("text-anchor", "middle")
        .style("fill", "red")
        .style("font-size", "10px")
        .attr("font-weight", "bold")
        .text("<" + range[0]);

      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2 + margin)
        .attr("text-anchor", "middle")
        .style("fill", "#fcba03")
        .style("font-size", "10px")
        .attr("font-weight", "bold")
        .text(">= " + range[0] + " and" + " < " + range[1]);

      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2 + margin * 1.5)
        .attr("text-anchor", "middle")
        .style("fill", "green")
        .style("font-size", "10px")
        .attr("font-weight", "bold")
        .text(">= " + range[1] + " and" + " < " + range[2]);

      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2 + margin * 2)
        .attr("text-anchor", "middle")
        .style("fill", "#fcba03")
        .style("font-size", "10px")
        .attr("font-weight", "bold")
        .text(">= " + range[2] + " and" + " < " + range[3]);

      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2 + margin * 2.5)
        .attr("text-anchor", "middle")
        .style("fill", "red")
        .style("font-size", "10px")
        .attr("font-weight", "bold")
        .text(">=" + range[3]);
    }
  }, [value, showText, range]);

  return (
    <>
      <svg ref={svgRef} width={300} height={200}></svg>
      <button onClick={() => setShowText(!showText)}>Show Range</button>
    </>
  );
};

export default GaugeChart;
