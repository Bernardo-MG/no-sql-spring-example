import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Planet } from 'app/planet';
import * as d3 from 'd3';
import { PlanetsService } from '../planets.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.sass'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PlanetComponent implements OnInit {

  @Input() planet: Planet = { name: '', satellites: [] } as Planet;

  constructor(
    private planetsService: PlanetsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // this.planetsService.getPlanet(params['id']).subscribe(d => this.planet = d);
      this.planetsService.getPlanet(params['id']).subscribe((d) => this.display(d));
    });
  }

  display(d) {
    this.planet = d;
    
    var view = d3.select("figure#planet_view")
      .append("svg")
      .attr("id", "planet")
      .attr("class", "full_size")
      .append("g");
    var mainView = d3.select("svg#planet");
    var node = mainView.node();
    var width = (node as SVGGElement).clientWidth;
    var height = (node as SVGGElement).clientHeight;

    this.displayPlanet(view, width, height, d);
  }

  /**
   * Displays the planet.
   * 
   * @param {*} view where the image will be drawn
   * @param {*} width max width
   * @param {*} height max height
   * @param {*} planet planet to display
   */
  private displayPlanet(view, width, height, planet) {
    var planetRadius = Math.min(width, height) / 10;

    var boundingArea = view.append("g")
      .attr("id", "planet_info");

    var planetView = boundingArea.append("g");

    // Graticule
    var path = this.getPath(planetRadius);

    var graticule = this.getGraticule(planetRadius);

    planetView.append("path")
      .attr("class", "graticule")
      .on("mouseover", (d) => this.handleShowName(planet.name))
      .on("mouseout", this.handleHideName)
      .datum(graticule)
      .attr("transform", "translate(" + [(width / 2) - planetRadius, (height / 2)] + ")")
      .attr("d", path);

    // Satellite orbit
    planetView.selectAll("g")
      .data(planet.satellites).enter()
      .append("circle")
      .attr("class", "orbit")
      .attr("transform", "translate(" + [(width / 2), (height / 2)] + ")")
      .attr("r", (d, i) => (i + 2) * planetRadius);

    // Satellite point
    planetView.selectAll("g")
      .data(planet.satellites).enter()
      .append("circle")
      .attr("id", (d) => "satellite_" + d.name)
      .on("mouseover", (d) => this.handleShowName(d.name))
      .on("mouseout", this.handleHideName)
      .attr("cx", (d, i) => (i + 2) * planetRadius)
      .attr("r", planetRadius / 5)
      .attr("transform", "translate(" + [(width / 2), (height / 2)] + ")");
  }

  private handleShowName(name) {
    // Specify where to put label of text
    d3.select("#planet_data")
      .append("text")
      .attr("id", "shown_name")
      .text(function () {
        return name;  // Value of the text
      });
  }

  private handleHideName() {
    d3.select("#shown_name").remove();
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
