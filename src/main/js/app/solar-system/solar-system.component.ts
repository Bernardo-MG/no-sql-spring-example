import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';

@Component({
  selector: 'app-solar-system',
  templateUrl: './solar-system.component.html',
  styleUrls: ['./solar-system.component.sass']
})
export class SolarSystemComponent implements OnInit {

  solar = [
    {
      name: "Mercury", data: [
        { id: 'tilt', value: 0.03, label: 'Tilt' },
        { id: 'radius', value: 2439.7, label: 'Radius' },
        { id: 'period', value: 58.65, label: 'Period' }
      ]
    },
    {
      name: "Venus", data: [
        { id: 'tilt', value: 2.64, label: 'Tilt' },
        { id: 'radius', value: 6051.8, label: 'Radius' },
        { id: 'period', value: -243, label: 'Period' }
      ]
    },
    {
      name: "Earth", data: [
        { id: 'tilt', value: 23.44, label: 'Tilt' },
        { id: 'radius', value: 6371, label: 'Radius' },
        { id: 'period', value: 1, label: 'Period' }
      ]
    },
    {
      name: "Mars", data: [
        { id: 'tilt', value: 6.68, label: 'Tilt' },
        { id: 'radius', value: 3389.5, label: 'Radius' },
        { id: 'period', value: 1.03, label: 'Period' }
      ]
    },
    {
      name: "Jupiter", data: [
        { id: 'tilt', value: 25.19, label: 'Tilt' },
        { id: 'radius', value: 69911, label: 'Radius' },
        { id: 'period', value: 0.41, label: 'Period' }
      ]
    },
    {
      name: "Saturn", data: [
        { id: 'tilt', value: 26.73, label: 'Tilt' },
        { id: 'radius', value: 58232, label: 'Radius' },
        { id: 'period', value: 0.44, label: 'Period' }
      ]
    },
    {
      name: "Uranus", data: [
        { id: 'tilt', value: 82.23, label: 'Tilt' },
        { id: 'radius', value: 25362, label: 'Radius' },
        { id: 'period', value: -0.72, label: 'Period' }
      ]
    },
    {
      name: "Neptune", data: [
        { id: 'tilt', value: 28.32, label: 'Tilt' },
        { id: 'radius', value: 24622, label: 'Radius' },
        { id: 'period', value: 0.72, label: 'Period' }
      ]
    }
  ];

  w = 960;
  h = 500;

  constructor(private router: Router) { }

  ngOnInit(): void {
    var view = d3.select("figure#main_view").append("svg")
      .attr("width", this.w)
      .attr("height", this.h)
      .append("g");

    this.displaySolarSystem(view);
  }

  /**
   * Displays the received planets list.
   * 
   * @param {*} x x axis position
   * @param {*} y y axis position
   * @param {*} width view width
   * @param {*} height view height
   * @param {*} planets planets to display
   */
  private displaySun(view, x, y, width, height) {
    var radius = width * 5;
    var xpos = x - (width * 4);
    var ypos = height / 2;

    var boundingArea = view.append("g")
      .attr("id", "sun")
      .attr("transform", "translate(" + [x, y] + ")");

    var sun = boundingArea.append("g")
      .attr("transform", "translate(" + [xpos, ypos] + ")");

    sun.append("circle")
      .attr("class", "planet")
      .attr("r", radius);
  }

  /**
   * Displays the received planets list.
   * 
   * @param {*} x x axis position
   * @param {*} y y axis position
   * @param {*} width view width
   * @param {*} height view height
   * @param {*} planets planets to display
   */
  private displayPlanets(view, x, y, width, height, planets) {
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

  private displaySolarSystem(view) {
    this.displaySun(view, 0, 0, (this.w / 4), this.h);
    this.displayPlanets(view, (this.w / 4), 0, this.w - (this.w / 4), this.h, this.solar);
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
  /**
   * Cleans up the view.
   */
  private cleanView() {
    d3.select("#sun").remove();
    d3.select("#planets").remove();
    d3.select("#planet_info").remove();
  }

}
