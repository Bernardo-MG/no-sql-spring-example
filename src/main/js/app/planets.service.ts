import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Planet } from './planet';
import { PlanetResponse } from './planetResponse';
import { map } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';


@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  constructor(
    private apollo: Apollo
  ) { }

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
