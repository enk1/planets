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
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SearchPlanetsService } from './search-planets.service';
import { PlanetSearchComponent } from './planet-search/planet-search.component';

@NgModule({
  declarations: [AppComponent, PlanetsComponent, PlanetDetailsComponent, PlanetSearchComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFontAwesomeModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [PlanetsService, SearchPlanetsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
