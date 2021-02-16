import { Planet } from './planet';

export interface PlanetResponse {
    allPlanets: Array<Planet>;
    planet: Planet;
}