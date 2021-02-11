import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Planet } from './planet';
import { ApiResponse } from './api-response';
import { catchError, map } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';

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
    this.apollo
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
      .valueChanges.subscribe((result: any) => {
        console.log(result);
      });

    return this.http.get<ApiResponse<Planet[]>>(this.planetsUrl).pipe(
      map((response: ApiResponse<Planet[]>) => { return response.content }),
      catchError(this.handleError<Planet[]>('getPlanets', undefined))
    ).pipe(
      catchError(this.handleError<Planet[]>('getPlanets', undefined))
    );
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

  getPlanet(id: String): Observable<Planet> {
    return this.http.get<ApiResponse<Planet>>(this.planetsUrl + "/" + id).pipe(
      map((response: ApiResponse<Planet>) => { return response.content }),
      catchError(this.handleError<Planet>('getPlanet', undefined))
    ).pipe(
      catchError(this.handleError<Planet>('getPlanet', undefined))
    );
  }

}
