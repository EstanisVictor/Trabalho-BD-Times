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
import { ITime } from "../../../interfaces";

interface Props {
  data: ITime[];
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

export const TimesTitulosGraph = ({ data, dimensions }: Props) => {
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

    const xValue = (d: ITime) => +d.id_time;
    const yValue = (d: ITime) => +d.qnt_titulos;

    const radius = 8;
    const svg = select(svgRef.current);

    const main = async () => {
      const x = scaleLinear()
        .domain([...extent(data, xValue)] as [number, number])
        .range([margin.left, svgWidth - margin.right]);

      const y = scaleLinear()
        .domain([...extent(data, yValue)] as [number, number])
        .range([height - margin.bottom, margin.top]);

      const marks = data.map((d) => ({
        x: x(xValue(d)),
        y: y(yValue(d)),
        text: d.nome,
        qnt_titulos: d.qnt_titulos,
      }));

      svg
        .append("g")
        .attr("class", "data")
        .selectAll("circle")
        .data(marks)
        .join("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", radius)
        .style("fill", "steelblue")
        .style("opacity", 0.7)
        // make the circle bigger on mouse over
        .on("mouseover", function (d) {
          select(this)
            .transition()
            .duration(100)
            .attr("r", radius * 1.5);
        })
        .on("mouseout", function (d) {
          select(this).transition().duration(200).attr("r", radius);
        })
        .append("title")
        .attr("class", "tooltip")
        .text((d) => `${d.text} - ${d.qnt_titulos} titulos`);

      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(
          axisLeft(y)
            .ticks(marks.length / 2)
            .tickSizeInner(-svgWidth)
        );

      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(
          axisBottom(x)
            .tickFormat((d) => marks[+d - 1]?.text)
            .ticks(marks.length)
        )
        .style("text-anchor", "end")
        .selectAll("text")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
    };
    main();

    return () => {
      svg.selectAll("*").remove();
    };
  }, [data, height, margin, width]);

  return <svg ref={svgRef} width={"100%"} height={height} />;
};
