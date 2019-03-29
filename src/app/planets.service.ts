import { Injectable } from '@angular/core';
import { Planet } from './model/planet';
import { PLANETS } from './model/planets-mock';
import { Observable } from 'rxjs/Observable';
import { catchError, map, concatAll } from 'rxjs/operators';
import 'rxjs/add/operator/find';
import 'rxjs/add/operator/map';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class PlanetsService {
  private apiUrl = 'https://swapi.co/api/planets/';
  private countAPI = 61;
  private paginationAPI = 10;

  getByPage(page: number): string {
    if (page) {
      return `&page=${page}`;
    } else {
      return '';
    }
  }

  calcRequestsBySizeAndPage(
    pageSize: number,
    currentPage: number
  ): Array<number> {
    const coefficient = Math.ceil(pageSize / this.paginationAPI);
    const upperBound = Math.ceil((pageSize * currentPage) / this.paginationAPI);
    const lowerBound = upperBound - coefficient + 1;
    console.log('pageSize ', pageSize);
    console.log('currentPage ', currentPage);
    return Array.from(
      { length: coefficient },
      (x, index) => lowerBound + index
    );
  }

  getIdFromUrl(url: string): string {
    const regex = /\d+/;
    return url.match(regex)[0];
  }

  getSetBySizePage(
    currentPage?: number,
    currentSize?: number
  ): Observable<Planet[]> {
    return <Observable<Planet[]>>(
      forkJoin(
        this.calcRequestsBySizeAndPage(currentSize, currentPage).map(
          id => <Observable<Planet[]>>this.getPlanets(id)
        )
      ).pipe(concatAll())
    );
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
