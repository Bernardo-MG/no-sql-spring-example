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

  @Input() planet: Planet = { name: '' } as Planet;

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
    var mainView = d3.select("figure#planet_view");
    var view = mainView.append("svg")
      .attr("id", "mainGraphic")
      .attr("class", "graphic_view")
      .append("g");
    var node = mainView.node();
    var width = (node as HTMLElement).clientWidth;
    var height = (node as HTMLElement).clientHeight;

    this.displayPlanetInfo(view, (width / 4), 0, width - (width / 4), height);
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
