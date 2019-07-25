import { TestBed } from '@angular/core/testing';

import { EditVenueService } from './edit-venue.service';

describe('EditVenueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditVenueService = TestBed.get(EditVenueService);
    expect(service).toBeTruthy();
  });
});
