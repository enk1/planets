import { Injectable } from '@angular/core';
import { Planet } from './planet';
import { PLANETS } from './planets-mock';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/operator/find';
import 'rxjs/add/operator/map';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class PlanetsService {
  private apiUrl = 'https://swapi.co/api/planets/';

  getByPage(page: number): string {
    if (page) {
      return `&page=${page}`;
    } else {
      return '';
    }
  }

  getIdFromUrl(url: string): string {
    const regex = /\d+/;
    return url.match(regex)[0];
  }

  getPlanets(page?: number): Observable<Planet[]> {
    return this.http
      .get<Planet[]>(`${this.apiUrl}?${this.getByPage(page)}`)
      .pipe(
        map(res => {
          return res['results'].map(planet => {
            return Object.assign(planet, { id: this.getIdFromUrl(planet.url) });
          });
        }),
        catchError(this.handleError)
      );
  }

  getPlanet(id: string): Observable<Planet> {
    return this.http.get<Planet>(`${this.apiUrl}${id}/`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(error.error.message);
    } else {
      console.error(error);
    }
    // return new ErrorObservable(
    //   'Something bad happened; please try again later.'
    // );
    return PLANETS;
  }

  constructor(private http: HttpClient) {}
}
