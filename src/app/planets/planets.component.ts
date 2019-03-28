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
  public pageSize: string;
  public currentPage: number;
  public pagination: number;

  changeSizePage(): void {
    switch (this.pageSize) {
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
    if (direction === 'left' && this.currentPage > 1) {
      this.currentPage -= 1;
      this.fetchPlanets(this.currentPage);
    } else if (direction === 'right' && this.currentPage < this.pagination) {
      this.currentPage += 1;
      this.fetchPlanets(this.currentPage);
    } else {
      this.fetchPlanets();
    }
  }

  fetchPlanets(currentPage?: number, currentSize?: number): void {
    if (currentPage) {
      this.planetService
        .getSetBySizePage(currentPage, currentSize)
        .subscribe(planets => {
          console.log(planets);
          this.planets = planets;
        });
    } else {
      this.planetService.getPlanets().subscribe(planets => {
        this.planets = planets;
      });
    }
  }

  constructor(private planetService: PlanetsService) {}

  ngOnInit() {
    this.pageSize = '10';
    this.currentPage = 1;
    this.pagination = 6;
    this.changePage();
  }
}
