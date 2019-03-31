import { Component, OnInit } from '@angular/core';
import { SearchPlanetsService } from '../search-planets.service';
import { Planet } from '../model/planet';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-planet-search',
  templateUrl: './planet-search.component.html',
  styleUrls: ['./planet-search.component.scss']
})
export class PlanetSearchComponent implements OnInit {
  private searchingValue = new Subject<string>();
  planets$: Observable<Planet[]>;

  search(term: string): void {
    this.searchingValue.next(term);
    console.log(this.planets$);
  }

  ngOnInit(): void {
    this.planets$ = this.searchingValue.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchService.searchPlanets(term))
    );
    // return this.searchService
    //   .searchPlanets(this.searchingValue)
    //   .subscribe(planets => {
    //     planets['results'];
    //   });
  }

  constructor(private searchService: SearchPlanetsService) {}
}
