import { TestBed } from '@angular/core/testing';

import { CampListingService } from './camp-listing.service';

describe('CampListingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CampListingService = TestBed.get(CampListingService);
    expect(service).toBeTruthy();
  });
});
