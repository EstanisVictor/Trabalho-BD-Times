import React from "react";
import {
  select,
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  line,
  curveMonotoneX,
} from "d3";
import { INascPerYear } from "../../../interfaces";

interface Props {
  data: INascPerYear[];
  dimensions: {
    width: number;
    height: number;
    margin: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
}

export const Nascimentos = ({ data, dimensions }: Props) => {
  const svgRef = React.useRef(null);
  const { height, margin } = dimensions;
  const [width, setWidth] = React.useState<number | null>(null);
  // const svgWidth = width + margin.left + margin.right;

  React.useLayoutEffect(() => {
    if (window && width === null) {
      window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    }

    const svgHeight = height + margin.top + margin.bottom;
    const svgWidth = Math.min(window.innerWidth, 1000);

    const xValue = (d: INascPerYear) => d.year;
    const yValue = (d: INascPerYear) => +d.count;

    const radius = 5;
    const svg = select(svgRef.current);

    const main = async () => {
      const x = scaleLinear()
        .domain([...extent(data, xValue)] as [number, number])
        .range([margin.left, svgWidth - margin.right]);

      const y = scaleLinear()
        .domain([...extent(data, yValue)] as [number, number])
        .range([height - margin.bottom, margin.top]);

      const marks = data.map((d, i) => ({
        x: x(xValue(d)),
        y: y(yValue(d)),
      }));

      console.log({ marks });

      const coords = marks.map((d) => [d.x, d.y]);
      coords.sort((a, b) => a[0] - b[0]);

      const lineGenerator = line().curve(curveMonotoneX);
      const myLine = lineGenerator(coords as [number, number][]);

      svg
        .append("g")
        .attr("class", "data")
        .selectAll("circle")
        .data(marks)
        .join("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", radius)
        .style("opacity", 0);

      svg
        .append("path")
        .attr("class", "line")
        .attr("d", myLine)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 4);

      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(axisLeft(y));

      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(
          axisBottom(x)
            .tickArguments([data.length])
            .tickFormat((d) => `${Number.parseInt(d.toString()) + 1}`)
            .ticks(marks.length / 2)
        )
        .selectAll("text")
        .attr("transform", "translate(-20,20)rotate(-65)");
    };
    main();

    return () => {
      svg.selectAll("*").remove();
    };
  }, [data, height, margin, width]);

  return <svg ref={svgRef} width={"100%"} height={400} />;
};
