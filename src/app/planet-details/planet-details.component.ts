import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlanetsService } from '../planets.service';
import { Planet } from '../planet';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.scss']
})
export class PlanetDetailsComponent implements OnInit {
  @Input() planet: Planet;

  constructor(
    private route: ActivatedRoute,
    private planetsService: PlanetsService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getPlanet();
  }

  goBack(): void {
    this.location.back();
  }

  getPlanet(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.planetsService
      .getPlanet(id)
      .subscribe(planet => (this.planet = planet));
  }
}
