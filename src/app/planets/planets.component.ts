import { Component, OnInit } from '@angular/core';
import { Planet } from '../planet';
import { PlanetsService } from '../planets.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  planets: Planet[];
  public selectOptions = ['5', '10', '25', '100'];
  public currentPage: number;
  public pagination: number;

  setPage(direction?: string): void {
    if (direction === 'left' && this.currentPage > 1) {
      this.currentPage -= 1;
      this.planetService.getPlanets(this.currentPage).subscribe(planets => {
        this.planets = planets;
      });
    } else if (direction === 'right' && this.currentPage < this.pagination) {
      this.currentPage += 1;
      this.planetService.getPlanets(this.currentPage).subscribe(planets => {
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
    this.currentPage = 1;
    this.pagination = 6;
    this.setPage();
  }
}
