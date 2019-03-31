import { TestBed, inject } from '@angular/core/testing';

import { SearchPlanetsService } from './search-planets.service';

describe('SearchPlanetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchPlanetsService]
    });
  });

  it('should be created', inject([SearchPlanetsService], (service: SearchPlanetsService) => {
    expect(service).toBeTruthy();
  }));
});
