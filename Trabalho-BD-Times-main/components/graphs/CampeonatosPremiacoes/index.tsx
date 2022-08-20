import React from "react";
import {
  select,
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  NumberValue,
  csv,
  min,
  max,
} from "d3";
import { ICampeonato, ITime } from "../../../interfaces";

interface Props {
  data: ICampeonato[];
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

export const CampeonatosPremiacoes = ({ data, dimensions }: Props) => {
  const svgRef = React.useRef(null);
  const { height, margin } = dimensions;
  const [width, setWidth] = React.useState<number | null>(null);
  // const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  React.useLayoutEffect(() => {
    if (window && width === null) {
      window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    }

    const svgWidth = Math.min(window.innerWidth, 1000);

    const xValue = (d: ICampeonato) => +d.premiacao;
    const yValue = (d: ICampeonato) => +d.id_camp;

    const svg = select(svgRef.current);

    const main = async () => {
      const x = scaleLinear()
        .domain([0, max(data, xValue)] as [number, number])
        .range([margin.left, svgWidth - margin.right]);

      const y = scaleLinear()
        .domain([0, max(data, yValue)] as [number, number])
        .range([height - margin.bottom, margin.top]);

      const marks = data.map((d) => ({
        x: x(xValue(d)),
        y: y(yValue(d)),
        text: d.nome,
        premiacao: d.premiacao,
      }));

    

      svg
        .selectAll("rect")
        .data(marks)
        .join("rect")
        .attr("x", (d) => 0)
        .attr("y", (d) => d.y)
        .attr("width", (d) => d.x - margin.left)
        .attr("transform", `translate(${margin.left},-20)`)
        .attr("height", (d) => 40)
        .style("fill", "steelblue")
        .style("opacity", 0.7)
        .on("mouseover", function (d) {})
        .append("title")
        .attr("class", "tooltip")
        .text((d) => `${d.text} - $${d.premiacao / 1000000} milhões`);

      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(
          axisLeft(y)
            .ticks(marks.length)
            .tickFormat((d) => marks[+d - 1]?.text)
            .tickSizeInner(0)
        )
        .selectAll("text")
        .attr("text-anchor", "start")
        .attr("transform", `translate(20,0)`);

      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(axisBottom(x).tickFormat((d) => `$${+d / 1000000} mi`))
        .attr("class", "axis-bottom")
        .selectAll("text")
        .attr("transform", "rotate(-90)")
        .attr("dy", "0em")
        .attr("dx", "-3em");
    };
    main();

    return () => {
      svg.selectAll("*").remove();
    };
  }, [
    data,
    height,
    margin.bottom,
    margin.left,
    margin.right,
    margin.top,
    width,
  ]);

  return <svg ref={svgRef} width={"100%"} height={svgHeight} />;
};
