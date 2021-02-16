import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Planet } from './planet';
import { PlanetResponse } from './planetResponse';
import { ApiResponse } from './api-response';
import { catchError, map } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';


@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  private planetsUrl = 'http://localhost:8080/rest/planet';  // URL to web api

  constructor(
    private http: HttpClient,
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

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getPlanet(planet: String): Observable<Planet> {
    const id = planet.toString();
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
