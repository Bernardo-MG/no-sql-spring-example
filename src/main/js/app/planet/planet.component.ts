import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as d3 from 'd3';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.sass']
})
export class PlanetComponent implements OnInit {

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

  @Input() planet: Object;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    var view = d3.select("figure#planet_view").append("svg")
      .attr("width", this.w)
      .attr("height", this.h)
      .append("g");

    this.route.params.subscribe(params => {
      this.getPlanet(params['id']);
    });

    this.displayPlanetInfo(view, (this.w / 4), 0, this.w - (this.w / 4), this.h, this.planet);
  }

  getPlanet(id: string): void {
    if (id) {
      this.planet = this.solar.find(element => element.name === id);
    }
  }

  /**
   * Displays the received planet info.
   * 
   * @param {*} x x axis position
   * @param {*} y y axis position
   * @param {*} width view width
   * @param {*} height view height
   * @param {*} planet planet data
   */
  private displayPlanetInfo(view, x, y, width, height, planet) {
    var planetViewWidth = (width / 3);
    var planetRadius = planetViewWidth / 3;

    var boundingArea = view.append("g")
      .attr("id", "planet_info")
      .attr("transform", "translate(" + [x, y] + ")");

    // Back button
    boundingArea.append("text")
      .text("Back")
      .attr("class", "info")
      .attr("class", "button");
    // .on("click", () => { this.cleanView(); this.displaySolarSystem(view); });

    // Information label
    var info = boundingArea.append("g")
      .attr("transform", "translate(" + [planetViewWidth, (planetViewWidth / 2.5)] + ")")
      .attr("class", "info");

    // Planet info
    planet.data.forEach(function (d, i) {
      info.append("text")
        .attr("y", i * 24)
        .text(d.label + ": " + d.value);
    });

    // Planet circle
    boundingArea.append("circle")
      .attr("class", "planet")
      .attr("transform", "translate(" + [(planetViewWidth / 2), (planetViewWidth / 2)] + ")")
      .attr("r", planetRadius)
      .style("fill", "none");
  }

}
