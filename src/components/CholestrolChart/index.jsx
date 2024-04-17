import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const CholestrolChart = ({ data }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 455, height: 225 });

  useEffect(() => {
    const margin = { top: 30, right: 30, bottom: 50, left: 70 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    let svg = d3.select(svgRef.current);

    let tooltip = d3
      .select(tooltipRef.current)
      .style("opacity", 0)
      .style("visibility", "none") // Set visibility
      .style("position", "absolute") // Add position style
      .style("background-color", "#fff") // Add background-color style
      .style("border", "1px solid #ccc") // Add border style
      .style("padding", "5px") // Add padding style
      .style("border-radius", "5px") // Add border-radius style
      .style("pointer-events", "none"); // Add pointer-events style;

    svg.selectAll("*").remove();

    svg = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const chartdata = [
      {
        key: "HDL",
        value: +data[2],
      },
      {
        key: "LDL",
        value: +data[1],
      },
      {
        key: "Triglyceride",
        value: +data[3],
      },
      {
        key: "Total Cholestrol",
        value: +data[0],
      },
    ];

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(chartdata.map((d) => d.key))
      .padding(0.2);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("path, line")
      .remove()
      .selectAll("text");

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartdata, (d) => d.value)])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y)).selectAll("path, line").remove();

    svg
      .selectAll("lines")
      .data(chartdata)
      .enter()
      .append("line")
      .attr("x1", function (d) {
        return x(d.key) + x.bandwidth() / 2;
      })
      .attr("x2", function (d) {
        return x(d.key) + x.bandwidth() / 2;
      })
      .attr("y1", function (d) {
        return y(d.value);
      })
      .attr("y2", y(0))
      .attr("stroke", "grey")
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .style("opacity", 1);

    let circles = svg
      .selectAll("circles")
      .data(chartdata)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d.key) + x.bandwidth() / 2;
      })
      .attr("cy", function (d) {
        return y(d.value);
      })
      .attr("r", "11")
      .style("fill", function (d) {
        if (d.key.localeCompare("Total Cholestrol") === 0) {
          if (d.value > 200 && d.value <= 225) {
            return "#fcba03";
          } else if (d.value > 225) {
            return "red";
          } else {
            return "green";
          }
        } else if (d.key.localeCompare("HDL") === 0) {
          if (d.value > 50 && d.value <= 59) {
            return "#fcba03";
          } else if (d.value > 59) {
            return "red";
          } else {
            return "green";
          }
        } else if (d.key.localeCompare("LDL") === 0) {
          if (d.value > 100 && d.value <= 129) {
            return "#fcba03";
          } else if (d.value > 129) {
            return "red";
          } else {
            return "green";
          }
        } else if (d.key.localeCompare("Triglyceride") === 0) {
          if (d.value > 150 && d.value <= 199) {
            return "#fcba03";
          } else if (d.value > 199) {
            return "red";
          } else {
            return "green";
          }
        }
      })
      .attr("stroke", "black")
      .style("opacity", 0);

    circles.transition().duration(1000).style("opacity", 1);

    circles
      .on("mouseover", function (event, d) {
        d3.select(this).style("r", 15);
        tooltip.transition().duration(300).style("opacity", 1);
        tooltip
          .html(
            `<span style="font-size:20px;font-weight:bold">${
              d.key
            } : ${parseFloat(d.value).toFixed(1)}`
          )
          .style("visibility", "visible") //adding values on tooltip
          .style("left", event.pageX + "px")
          .style("top", event.pageY + "px");
      })
      .on("mouseleave", function (d) {
        //hiding tooltip effects
        d3.select(this).style("r", 11);

        tooltip
          .style("visibility", "none")
          .transition()
          .duration(301)
          .style("opacity", 0);
      });
  }, [data]);

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
    </>
  );
};

export default CholestrolChart;
