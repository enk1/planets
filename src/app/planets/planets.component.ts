import { Component, OnInit, Input } from '@angular/core';
import { Planet } from '../model/planet';
import { PlanetsService } from '../planets.service';
import { SearchPlanetsService } from '../search-planets.service';
import 'rxjs/add/operator/take';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  planets: Planet[];

  public pageSizeOptions = [5, 10, 25, 100];
  public currentSize: string;
  public currentPage: number;
  public pagination: number;
  private countAPI = 61;
  public searchingValue: string;
  //private searchingValue = new Subject<string>();

  changeSizePage(): void {
    this.planets.length = 0;
    this.pagination = Math.ceil(this.countAPI / +this.currentSize);
    if (this.currentPage > this.pagination) {
      this.currentPage = 1;
    }

    switch (this.currentSize) {
      case '5':
        this.fetchPlanets(this.currentPage, 5);
        break;
      case '10':
        this.fetchPlanets(this.currentPage, 10);
        break;
      case '25':
        this.fetchPlanets(this.currentPage, 25);
        break;
      case '100':
        this.fetchPlanets(this.currentPage, 100);
        break;
    }
  }

  search(): void {
    if (this.searchingValue.length >= 3) {
      this.searchService
        .searchPlanets(this.searchingValue)
        .subscribe(planets => {
          this.planets = planets;
        });
    }
    // this.planets = this.searchingValue.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((term: string) => this.searchService.searchPlanets(term))
    // );
  }

  changePage(direction?: string): void {
    this.planets.length = 0;

    if (direction === 'left' && this.currentPage > 1) {
      this.currentPage -= 1;
      this.fetchPlanets(this.currentPage, +this.currentSize);
    } else if (direction === 'right' && this.currentPage <= this.pagination) {
      this.currentPage += 1;
      this.fetchPlanets(this.currentPage, +this.currentSize);
    }
  }

  fetchPlanets(currentPage?: number, currentSize?: number): void {
    if (currentPage) {
      if (currentSize === 5 || currentSize === 25) {
        if (currentPage % 2 === 0) {
          this.planetService
            .getSetBySizePage(currentPage, currentSize)
            .subscribe(
              planets => {
                this.planets = [...this.planets, ...planets];
              },
              err => {
                console.error(err);
              },
              () => {
                this.planets = this.planets.slice(
                  this.planets.length - currentSize,
                  this.planets.length
                );
              }
            );
        } else {
          this.planetService
            .getSetBySizePage(currentPage, currentSize)
            .subscribe(
              planets => {
                this.planets = [...this.planets, ...planets];
              },
              err => {
                console.error(err);
              },
              () => {
                this.planets = this.planets.slice(0, currentSize);
              }
            );
        }
      } else {
        this.planetService
          .getSetBySizePage(currentPage, currentSize)
          .subscribe(planets => {
            this.planets = [...this.planets, ...planets];
          });
      }
    } else {
      this.planetService.getPlanets().subscribe(planets => {
        this.planets = planets;
      });
    }
  }

  constructor(
    private planetService: PlanetsService,
    private searchService: SearchPlanetsService
  ) {}

  ngOnInit() {
    this.currentSize = '10';
    this.currentPage = 1;
    this.pagination = 7;
    this.fetchPlanets();
  }
}
