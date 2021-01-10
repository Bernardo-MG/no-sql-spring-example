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
    this.displayPlanets(view, sunWidth, height / 2, width - sunWidth, height, planets);
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
    var xpos = 0 - radius + 412;
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
    var planetRadius = planetViewWidth / 3;
    var planetViewHeight = height / 2;
    var planetViewSide = planetRadius * 2;

    // General container
    var planetsView = view.append("g")
      .attr("id", "planets")
      .attr("transform", "translate(" + [x + 10, y] + ")");

    // Planet container
    planetsView = planetsView.selectAll("g")
      .data(planets)
      .enter().append("g")
      .attr("transform", (d, i) => "translate(" + [i * (planetViewSide + 10), 0] + ")");

    // Planet circle
    planetsView.append("circle")
      .attr("class", "planet")
      .attr("transform", (d, i) => "translate(" + [planetRadius, 0] + ")")
      .attr("r", planetRadius)
      .on("click", (event, data) => this.router.navigate(['planet', data.name]));

    // Planet name
    planetsView.append("text")
      .attr("class", "label")
      .attr("transform", "translate(" + [0, -(planetRadius + 10)] + ")")
      .text(d => d.name);
  }

}
