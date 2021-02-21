import { Planet } from './planet';

/**
 * Response from the backend API for planet requests.
 */
export interface PlanetResponse {
    allPlanets: Array<Planet>;
    planet: Planet;
}