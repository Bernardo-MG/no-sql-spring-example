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
    // Creates the SVG view
    var view = d3.select("figure#main_graphic")
      .append("svg")
      .attr("id", "solar_system")
      .attr("class", "full_size")
      .append("g");

    // Prepares definitions
    this.initializeDefinitions();

    this.planetsService.getPlanets().subscribe(planets => this.displaySystem(view, planets));
  }

  /**
   * Sets the definitions needed to show the planets.
   */
  initializeDefinitions() {
    var svgDefs = d3.select("#solar_system").append('defs');

    var mainGradient = svgDefs.append('radialGradient')
      .attr('id', 'sunGradient');

    mainGradient.append('stop')
      .attr('class', 'stop-left')
      .attr('offset', '0');

    mainGradient.append('stop')
      .attr('class', 'stop-right')
      .attr('offset', '1');
  }

  /**
   * Draws the solar system in the view..
   * 
   * @param {*} view where the image will be drawn
   * @param planets planets to draw
   */
  displaySystem(view, planets: Planet[]) {
    var mainView = d3.select("svg#solar_system");
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
   * @param {*} radius sun radius
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
      .attr("class", "sun centered")
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
      .data(planets).enter()
      .append("g")
      .attr("transform", (d, i) => "translate(" + [i * (planetViewSide + padding), 0] + ")");

    // Graticule
    var path = this.getPath(planetRadius);
    var graticule = this.getGraticule(planetRadius);

    // Required to identify planets when clicking on them
    const index = d3.local();

    planetsView.append("path")
      .attr("class", "graticule clickable")
      .datum(graticule)
      .attr("d", path)
      .each((d, i) => index.set(d, i))
      .on("click", (event, data) => this.router.navigate(['planet', planets[index.get(data) as number].name]));

    // Planet name
    planetsView.append("text")
      .attr("text-anchor", "start")
      .attr("dy", -(planetRadius + padding))
      .text(d => d.name);
  }

  private getPath(radius) {
    var radiusScale = d3.scaleLinear()
      .domain([0, radius])
      .range([0, radius]);

    var projection = d3.geoOrthographic()
      .translate([radius, 0])
      .scale(radiusScale(radius));

    return d3.geoPath()
      .projection(projection);
  }

  private getGraticule(radius) {
    var graticuleScale = d3.scaleLinear()
      .domain([0, radius])
      .range([0, 10]);

    var graticule = d3.geoGraticule();

    return graticule.step([graticuleScale(radius), graticuleScale(radius)]);
  }

}
