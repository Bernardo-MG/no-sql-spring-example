import { Injectable } from '@angular/core';
import { Planet } from './planet';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  solar: Array<Planet> = [
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

  constructor() { }

  planets(): Array<Planet> {
    return this.solar;
  }

  planet(id: String): Planet {
    return this.solar.find(element => element.name === id);
  }

}
