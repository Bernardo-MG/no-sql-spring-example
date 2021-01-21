import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Planet } from 'app/planet';
import * as d3 from 'd3';
import { PlanetsService } from '../planets.service';

@Component({
  selector: 'app-solar-system',
  templateUrl: './solar-system.component.html',
  styleUrls: ['./solar-system.component.sass']
})
export class SolarSystemComponent implements OnInit {

  constructor(
    private planetsService: PlanetsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    var view = d3.select("figure#main_view")
      .append("svg")
      .attr("id", "mainGraphic")
      .attr("class", "graphic_view")
      .append("g");

    this.planetsService.getPlanets().subscribe(planets => this.display(view, planets));
  }

  display(view, planets: Planet[]) {
    var mainView = d3.select("svg#mainGraphic");
    var node = mainView.node();
    var width = (node as HTMLElement).clientWidth;
    var height = (node as HTMLElement).clientHeight;
    var sunWidth = (width / 8);
    
    mainView.attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr('preserveAspectRatio', 'xMinYMin');

    var radius = Math.min(sunWidth, height);

    this.displaySun(view, radius);
    this.displayPlanets(view, sunWidth, height / 2, width - sunWidth, height, planets);
  }

  /**
   * Draws the sun in the view.
   * 
   * @param {*} view where the image will be drawn
   * @param {*} width view width
   */
  private displaySun(view, radius) {
    var arcGen = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
      .startAngle(0)
      .endAngle(Math.PI);

    view
      .append("path")
      .attr("id", "sun")
      .attr("class", "planet centered")
      .attr("d", arcGen)
      .attr("stroke-width", 1);
  }

  /**
   * Draws the planets in the view.
   * 
   * @param {*} view where the image will be drawn
   * @param {*} x x axis position
   * @param {*} y y axis position
   * @param {*} width view width
   * @param {*} height view height
   * @param {*} planets planets to display
   */
  private displayPlanets(view, x, y, width, height, planets: Array<Planet>) {
    var padding = 10;
    var margin = 10;
    var reducedWith = width - margin;
    var planetViewSide = (reducedWith / planets.length) - padding;
    var planetRadius = planetViewSide / 2;

    // General container
    var planetsView = view.append("g")
      .attr("id", "planets")
      .attr("transform", "translate(" + [x + margin, y] + ")");

    // Planet container
    planetsView = planetsView.selectAll("g")
      .data(planets)
      .enter().append("g")
      .attr("transform", (d, i) => "translate(" + [i * (planetViewSide + padding), 0] + ")");

    // Planet circle
    planetsView.append("circle")
      .attr("class", "planet")
      .attr("transform", (d, i) => "translate(" + [planetRadius, 0] + ")")
      .attr("r", planetRadius)
      .on("click", (event, data) => this.router.navigate(['planet', data.name]));

    // Planet name
    planetsView.append("text")
      .attr("text-anchor", "start")
      .attr("dy", -(planetRadius + padding))
      .text(d => d.name);
  }

}
