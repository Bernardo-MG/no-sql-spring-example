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

  w = 960;
  h = 500;

  @Input() planet: Planet;

  constructor(
    private planetsService: PlanetsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.planetsService.getPlanet(params['id']).subscribe(d => this.planet = d);
    });
    this.display();
  }

  display() {
    var view = d3.select("figure#planet_view").append("svg")
      .attr("width", this.w)
      .attr("height", this.h)
      .append("g");

    this.displayPlanetInfo(view, (this.w / 4), 0, this.w - (this.w / 4), this.h);
  }

  /**
   * Displays the planet info.
   * 
   * @param {*} x x axis position
   * @param {*} y y axis position
   * @param {*} width view width
   * @param {*} height view height
   * @param {*} planet planet data
   */
  private displayPlanetInfo(view, x, y, width, height) {
    var planetViewWidth = (width / 3);
    var planetRadius = planetViewWidth / 3;

    var boundingArea = view.append("g")
      .attr("id", "planet_info")
      .attr("transform", "translate(" + [x, y] + ")");

    // Planet circle
    boundingArea.append("circle")
      .attr("class", "planet")
      .attr("transform", "translate(" + [(planetViewWidth / 2), (planetViewWidth / 2)] + ")")
      .attr("r", planetRadius)
      .style("fill", "none");
  }

}
