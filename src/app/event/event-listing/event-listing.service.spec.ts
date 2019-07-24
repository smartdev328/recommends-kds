import { TestBed } from '@angular/core/testing';

import { EventListingService } from './event-listing.service';

describe('EventListingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventListingService = TestBed.get(EventListingService);
    expect(service).toBeTruthy();
  });
});
