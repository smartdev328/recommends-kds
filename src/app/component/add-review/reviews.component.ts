import { Component, OnInit } from '@angular/core';
import { ReviewsService } from './reviews.service';
import { ENTITY_TYPES_ENUM } from '@shared/constants/VenueConstants';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})

export class ReviewsComponent implements OnInit {
  public review: string;
  public isErrorVisible: Boolean;
  public errorMessage: String;

  constructor(private reviewService: ReviewsService) {
    this.isErrorVisible = false;
    this.errorMessage = '';
  }

  ngOnInit() {
  }

  add_review() {
    if (this.validate_review()) {
      this.isErrorVisible = false;
      const input_data = {
        'input': {
          'entity_type': ENTITY_TYPES_ENUM.VENUE,
          // 'entity_id' : '1255',
          // 'parent_id' : '45',
          'review': this.review,
          'is_approved': false
        }
      };
      this.reviewService.add_review(input_data).subscribe(data => {
        if (data['status'] === true) {
          this.isErrorVisible = true;
          this.errorMessage = 'Review , successfully added';
        } else {
          this.isErrorVisible = true;
          this.errorMessage = 'Error while adding a new review';
        }
      }, error => {
        this.isErrorVisible = true;
        this.errorMessage = 'Something went wrong while adding review';
      });

    } else {
      this.isErrorVisible = true;
      this.errorMessage = 'Please type review';
    }
  }

  validate_review() {
    if (this.review.trim().length === 0) {
      return false;
    }
    return true;
  }
  closeErrorBox() {
    this.isErrorVisible = false;
  }
}
