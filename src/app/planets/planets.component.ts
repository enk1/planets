import { Component, OnInit } from '@angular/core';
import { Planet } from '../model/planet';
import { PlanetsService } from '../planets.service';

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
  public countAPI = 61;

  changeSizePage(): void {
    this.planets.length = 0;
    this.pagination = Math.ceil(+this.currentSize / this.countAPI);
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

  changePage(direction?: string): void {
    this.planets.length = 0;
    if (direction === 'left' && this.currentPage > 1) {
      this.currentPage -= 1;
      this.fetchPlanets(this.currentPage, +this.currentSize);
    } else if (direction === 'right' && this.currentPage < this.pagination) {
      this.currentPage += 1;
      this.fetchPlanets(this.currentPage, +this.currentSize);
    } else {
      this.fetchPlanets();
    }
  }

  fetchPlanets(currentPage?: number, currentSize?: number): void {
    if (currentPage) {
      this.planetService
        .getSetBySizePage(currentPage, currentSize)
        .subscribe(planets => {
          this.planets = [...this.planets, ...planets];
        });
    } else {
      this.planetService.getPlanets().subscribe(planets => {
        this.planets = planets;
      });
    }
  }

  constructor(private planetService: PlanetsService) {}

  ngOnInit() {
    this.currentSize = '10';
    this.currentPage = 1;
    this.pagination = 6;
    this.fetchPlanets();
  }
}
