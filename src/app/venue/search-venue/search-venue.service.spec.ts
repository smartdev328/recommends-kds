import { TestBed } from '@angular/core/testing';

import { SearchVenueService } from './search-venue.service';

describe('SearchVenueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchVenueService = TestBed.get(SearchVenueService);
    expect(service).toBeTruthy();
  });
});
