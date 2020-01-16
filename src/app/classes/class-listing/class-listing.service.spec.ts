import { TestBed } from '@angular/core/testing';

import { ClassListingService } from './class-listing.service';

describe('ClassListingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassListingService = TestBed.get(ClassListingService);
    expect(service).toBeTruthy();
  });
});