import { Component, inject, effect } from '@angular/core';
import * as d3 from 'd3';
import { ReposStore } from '../../core/store/repos.store';

@Component({
  selector: 'app-d3-chart',
  templateUrl: './d3-chart.component.html',
  styleUrl: './d3-chart.component.scss'
})
export class D3ChartComponent {
  readonly store = inject(ReposStore);
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor() {
    effect(() => {
      if(this.store.repos().length) {
        this.createSvg();
        this.drawBars(this.store.repos());
      }
    })
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    // .attr("viewBox", `0 0 ${this.height + (this.margin * 2)} ${this.width + (this.margin * 2)}`)
    .append("g")
    .attr("transform", "translate(" + this.margin * 2 + "," + this.margin / 4 + ")");
}

private drawBars(data: any[]): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.name))
  .padding(0.2);

  // Draw the X-axis on the DOM
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 10000])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  this.svg.append("g")
  .call(d3.axisLeft(y));

  // Create and fill the bars
  this.svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d: any) => x(d.name))
  .attr("y", (d: any) => y(d.stargazerCount))
  .attr("width", x.bandwidth())
  .attr("height", (d: any) => this.height - y(d.stargazerCount))
  // .attr("viewBox", `0 0 ${(d: any) => this.height - y(d.stargazerCount)} ${x.bandwidth()}`)
  .attr("fill", "#d04a35");

  this.svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", this.width)
    .attr("y", this.height + 60)
    .text("Visionmedia repositories");

    this.svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -60)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("No. of Stars");
}

// onResize(event: any) {
//   // this.createSvg();
//         // this.drawBars(this.store.repos());
// }
}
