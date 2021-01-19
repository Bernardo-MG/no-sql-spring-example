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
    var view = d3.select("figure#planet_view")
      .append("svg")
      .attr("id", "mainGraphic")
      .attr("class", "graphic_view")
      .append("g");
    var mainView = d3.select("svg#mainGraphic");
    var node = mainView.node();
    var width = (node as SVGGElement).clientWidth;
    var height = (node as SVGGElement).clientHeight;

    this.displayPlanetInfo(view, width / 9);
  }

  /**
   * Displays the planet.
   * 
   * @param {*} view where the image will be drawn
   * @param {*} width view width
   */
  private displayPlanetInfo(view, radius) {
    var boundingArea = view.append("g")
      .attr("id", "planet_info");

    // Planet circle
    boundingArea.append("circle")
      .attr("class", "planet")
      .attr("transform", "translate(" + [radius, radius] + ")")
      .attr("r", radius)
      .style("fill", "none");
  }

}
