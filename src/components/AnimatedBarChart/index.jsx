import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const AnimatedBarChart = ({ value = 0 }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 255, height: 255 });
  const [showRange, setShowRange] = useState(false);

  useEffect(() => {
    const margin = { top: 0, right: 30, bottom: 99, left: 50 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    let svg = d3.select(svgRef.current);

    let tooltip = d3
      .select(tooltipRef.current)
      .style("opacity", 0)
      .style("visibility", "none")
      .style("position", "absolute")
      .style("background-color", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("pointer-events", "none");

    svg.selectAll("*").remove();

    svg = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    let bardata = [
      {
        key: "Hemoglobin",
        value: value,
      },
    ];

    const x = d3.scaleBand().range([0, width]).domain(bardata.map((d) => d.key));

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("path, line")
      .remove()
      .selectAll("text");

    svg
      .append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.bottom})`)
      .style("text-anchor", "middle")
      .style("fill", "white")
      .text("Sectors");

    const y = d3.scaleLinear().domain([0, 20]).range([height, 0]);

    svg.selectAll("path, line").remove();

    const bars = svg
      .selectAll(".barsClass")
      .data(bardata)
      .enter()
      .append("rect")
      .attr("class", "barsClass")
      .attr("x", (d) => x(d.key))
      .attr("y", (d) => y(0))
      .attr("width", x.bandwidth())
      .attr("height", (d) => 0)
      .style("opacity", 1);

    bars
      .transition()
      .style("fill", (d, i) => {
        if (d.value >= 14 && d.value <= 16.7) {
          return "green";
        } else if (d.value > 16.7 && d.value <= 18) {
          return "#fcba03";
        } else if (d.value > 18) {
          return "red";
        } else if (d.value < 14 && d.value >= 11) {
          return "#fcba03";
        } else {
          return "red";
        }
      })
      .duration(1705)
      .delay((d, i) => (i * 1701) / 3)
      .attr("x", (d) => x(d.key))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => Math.max(0, height - y(d.value)));

    bars
      .on("mouseover", function (event, d) {
        d3.selectAll(".selected_bars").style("opacity", 0.5);
        d3.select(this).style("opacity", 1).style("stroke", "black");

        d3.select(this).style("fill-opacity", 1);
        tooltip.transition().duration(300).style("opacity", 1);
        tooltip
          .html(
            `<span style="font-size:20px;font-weight:bold">${
              d.key
            } : ${parseFloat(d.value).toFixed(1)}`
          )
          .style("visibility", "visible")
          .style("left", event.pageX + "px")
          .style("top", event.pageY + "px");
      })
      .on("mouseleave", function (d) {
        d3.selectAll(".selected_bars").style("opacity", 0.8);

        d3.select(this).style("stroke", "transparent");

        tooltip
          .style("visibility", "none")
          .transition()
          .duration(301)
          .style("opacity", 0);
      });

    svg
      .selectAll(".bar-label")
      .data(bardata)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", (d) => x(d.key) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.value) - 5)
      .attr("text-anchor", "middle")
      .style("fill", (d, i) => {
        if (d.value >= 14 && d.value <= 16.7) {
          return "green";
        } else if (d.value > 16.7 && d.value <= 18) {
          return "#fcba03";
        } else if (d.value > 18) {
          return "red";
        } else if (d.value < 14 && d.value >= 11) {
          return "#fcba03";
        } else {
          return "red";
        }
      })
      .text((d) => d.value);

    if (showRange) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + 35)
        .attr("text-anchor", "middle")
        .style("fill", "red")
        .style("font-size", "15px")
        .attr("font-weight", "bold")
        .text("<11");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + 50)
        .attr("text-anchor", "middle")
        .style("fill", "#fcba03")
        .style("font-size", "15px")
        .attr("font-weight", "bold")
        .text(">=11 and <14");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + 65)
        .attr("text-anchor", "middle")
        .style("fill", "green")
        .style("font-size", "15px")
        .attr("font-weight", "bold")
        .text(">=14 and <=16.7");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + 80)
        .attr("text-anchor", "middle")
        .style("fill", "#fcba03")
        .style("font-size", "15px")
        .attr("font-weight", "bold")
        .text(">16.7 and <=18");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + 95)
        .attr("text-anchor", "middle")
        .style("fill", "red")
        .style("font-size", "15px")
        .attr("font-weight", "bold")
        .text(">18");
    }
  }, [value, showRange, dimensions]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries && entries.length > 0) {
        const entry = entries[0];
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(svgRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={tooltipRef}></div>
      <svg ref={svgRef}></svg>
      <button style={{ position: "absolute",  top: "400px" }} onClick={() => setShowRange(!showRange)}>Show Range</button>
    </>
  );
};

export default AnimatedBarChart;

