import { Injectable } from '@angular/core';
import { Planet } from './model/planet';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class SearchPlanetsService {
  private apiUrl = 'https://swapi.co/api/planets/?search=';

  getIdFromUrl(url: string): string {
    const regex = /\d+/;
    return url.match(regex)[0];
  }

  searchPlanets(name: string): Observable<Planet[]> {
    if (!name.trim()) {
      return of([]);
    }
    if (name.length >= 3) {
      return this.http.get<Planet[]>(`${this.apiUrl}${name}`).pipe(
        map(res => {
          return res['results'].map(planet => {
            return Object.assign(planet, { id: this.getIdFromUrl(planet.url) });
          });
        }),
        catchError(this.handleError)
      );
    }
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(error.error.message);
    } else {
      console.error(error);
    }
    return new ErrorObservable(
      'Something bad happened; please try again later.'
    );
  }

  constructor(private http: HttpClient) {}
}
