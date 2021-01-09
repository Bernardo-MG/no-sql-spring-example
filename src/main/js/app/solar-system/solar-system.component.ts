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
      .append("g");

    this.planetsService.getPlanets().subscribe(planets => this.display(view, planets));
  }

  display(view, planets: Planet[]) {
    var mainView = d3.select("svg#mainGraphic");
    var node = mainView.node();
    var width = (node as HTMLElement).clientWidth;
    var height = (node as HTMLElement).clientHeight;
    var sunWidth = (width / 4);

    this.displaySun(view, sunWidth, height);
    this.displayPlanets(view, sunWidth, 0, width - sunWidth, height, planets);
  }

  /**
   * Draws the sun in the view.
   * 
   * @param {*} view where the image will be drawn
   * @param {*} x x axis position
   * @param {*} y y axis position
   * @param {*} width view width
   * @param {*} height view height
   * @param {*} planets planets to display
   */
  private displaySun(view, width, height) {
    var radius = width * 5;
    var xpos = 0 - (width * 4);
    var ypos = height / 2;

    var sun = view.append("g")
      .attr("id", "sun")
      .attr("transform", "translate(" + [xpos, ypos] + ")");

    sun.append("circle")
      .attr("class", "planet")
      .attr("r", radius);
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
    var planetViewWidth = (width / planets.length);
    var planetViewHeight = height / 2;
    var planetRadius = planetViewWidth / 3;

    var planetsView = view.append("g")
      .attr("id", "planets")
      .attr("transform", "translate(" + [x, y] + ")")
      .selectAll("g")
      .data(planets)
      .enter().append("g")
      .attr("transform", (d, i) => "translate(" + [i * (planetViewWidth), planetViewHeight] + ")")
      .on("click", (event, data) => this.router.navigate(['planet', data.name]));

    // Planet name
    planetsView.append("text")
      .attr("class", "label")
      .attr("transform", "translate(" + [planetViewWidth / 3, -planetViewWidth / 2] + ")")
      .text(d => d.name);

    // Planets are drawn
    const draw = this.drawPlanet;
    planetsView.each(function (d) {
      var x = d3.select(this);
      draw(x, planetViewWidth / 2, planetRadius);
    });
  }

  /**
   * Draws a planet circle.
   * 
   * @param {*} element elemento where to draw the circle
   * @param {*} xpos x axis position
   * @param {*} radius planet radius
   */
  private drawPlanet(element, xpos, radius) {
    var planet = element.append("g")
      .attr("transform", "translate(" + [xpos, 0] + ")");

    planet.append("circle")
      .attr("class", "planet")
      .attr("r", radius);
  }

}
