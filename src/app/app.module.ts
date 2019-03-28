import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';
import { PlanetsService } from './planets.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, PlanetsComponent, PlanetDetailsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [PlanetsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
