import { TestBed } from '@angular/core/testing';

import { ApproveVenueReviewsService } from './approve-review.service';

describe('ApproveVenueReviewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApproveVenueReviewsService = TestBed.get(ApproveVenueReviewsService);
    expect(service).toBeTruthy();
  });
});
