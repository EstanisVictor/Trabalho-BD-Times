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
import { IJogador } from "../../../interfaces";

interface Props {
  data: IJogador[];
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

export const JogadoresValorGraph = ({ data, dimensions }: Props) => {
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

    const xValue = (d: IJogador, i: number) => i;
    const yValue = (d: IJogador) => +d.valor_passe;

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
        x: x(xValue(d, i)),
        y: y(yValue(d)),
        text: d.nome,
        valor_passe: d.valor_passe,
        gender: d.genero,
      }));

  

      svg
        .append("g")
        .attr("class", "data")
        .selectAll("rect")
        .data(marks)
        .join("rect")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .attr("width", 20)
        .attr("height", (d) => (d.valor_passe - min(data, yValue)!) / 149000)
        .style("fill", (d) => (d.gender === "M" ? "steelblue" : "magenta"))
        .style("opacity", 0.7)
        .on("mouseover", function (d) {})
        .append("title")
        .attr("class", "tooltip")
        .text(
          (d) => `${d.text} - ${Math.floor(d.valor_passe / 1000000)} milhões`
        );

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
            .tickFormat((d) => `${Number.parseInt(d.toString()) + 1}º`)
        );
    };
    main();

    return () => {
      svg.selectAll("*").remove();
    };
  }, [data, height, margin, width]);

  return <svg ref={svgRef} width={"100%"} height={400} />;
};
