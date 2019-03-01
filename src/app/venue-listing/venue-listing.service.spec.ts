import { TestBed } from '@angular/core/testing';

import { VenueListingService } from './venue-listing.service';

describe('VenueListingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VenueListingService = TestBed.get(VenueListingService);
    expect(service).toBeTruthy();
  });
});
