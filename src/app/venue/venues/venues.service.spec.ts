import { TestBed } from '@angular/core/testing';

import { VenuesService } from './venues.service';

describe('VenuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VenuesService = TestBed.get(VenuesService);
    expect(service).toBeTruthy();
  });
});
