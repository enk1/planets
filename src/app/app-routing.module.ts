import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/planets', pathMatch: 'full' },
  { path: 'planets', component: PlanetsComponent },
  { path: 'detail/:id', component: PlanetDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: []
})
export class AppRoutingModule {}
