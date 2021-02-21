import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Planet } from './planet';
import { PlanetResponse } from './planetResponse';
import { map } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';

/**
 * Service handling the acquisition of planet data.
 * 
 * The data is requested to a GraphQL endpoint.
 */
@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  constructor(
    private apollo: Apollo
  ) { }

  /**
   * Returns all teh existing planets.
   * 
   * @returns all the planets
   */
  getPlanets(): Observable<Planet[]> {
    return this.apollo
      .watchQuery({
        query: gql`
          {
            allPlanets {
              name
              position
              satellites {
                name
              }
            }
          }
        `,
      })
      .valueChanges.pipe(map((response: ApolloQueryResult<PlanetResponse>) => { return response.data.allPlanets }));
  }

  /**
   * Returns a single planet, for the received id.
   * 
   * @param id 
   * @returns the planet for the id
   */
  getPlanet(id: String): Observable<Planet> {
    return this.apollo
      .watchQuery({
        query: gql`
          query Query($id: String!) {
            planet(id: $id) {
              name
              position
              satellites {
                name
              }
            }
          }
        `,
        variables: { id }
      })
      .valueChanges.pipe(map((response: ApolloQueryResult<PlanetResponse>) => { return response.data.planet }));
  }

}
