import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Planet } from './planet';
import { ApiResponse } from './api-response';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  solar: Array<Planet> = [
    {
      name: "Mercury", info: [
        { id: 'tilt', value: 0.03, label: 'Tilt' },
        { id: 'radius', value: 2439.7, label: 'Radius' },
        { id: 'period', value: 58.65, label: 'Period' }
      ]
    },
    {
      name: "Venus", info: [
        { id: 'tilt', value: 2.64, label: 'Tilt' },
        { id: 'radius', value: 6051.8, label: 'Radius' },
        { id: 'period', value: -243, label: 'Period' }
      ]
    },
    {
      name: "Earth", info: [
        { id: 'tilt', value: 23.44, label: 'Tilt' },
        { id: 'radius', value: 6371, label: 'Radius' },
        { id: 'period', value: 1, label: 'Period' }
      ]
    },
    {
      name: "Mars", info: [
        { id: 'tilt', value: 6.68, label: 'Tilt' },
        { id: 'radius', value: 3389.5, label: 'Radius' },
        { id: 'period', value: 1.03, label: 'Period' }
      ]
    },
    {
      name: "Jupiter", info: [
        { id: 'tilt', value: 25.19, label: 'Tilt' },
        { id: 'radius', value: 69911, label: 'Radius' },
        { id: 'period', value: 0.41, label: 'Period' }
      ]
    },
    {
      name: "Saturn", info: [
        { id: 'tilt', value: 26.73, label: 'Tilt' },
        { id: 'radius', value: 58232, label: 'Radius' },
        { id: 'period', value: 0.44, label: 'Period' }
      ]
    },
    {
      name: "Uranus", info: [
        { id: 'tilt', value: 82.23, label: 'Tilt' },
        { id: 'radius', value: 25362, label: 'Radius' },
        { id: 'period', value: -0.72, label: 'Period' }
      ]
    },
    {
      name: "Neptune", info: [
        { id: 'tilt', value: 28.32, label: 'Tilt' },
        { id: 'radius', value: 24622, label: 'Radius' },
        { id: 'period', value: 0.72, label: 'Period' }
      ]
    }
  ];

  private planetsUrl = 'http://localhost:8080/rest/planet';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  getPlanets(): Observable<Planet[]> {
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

  planet(id: String): Planet {
    return this.solar.find(element => element.name === id);
  }

}
