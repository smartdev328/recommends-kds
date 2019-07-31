import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { HikingTrailModel } from './add-hiking/hiking.model';
import { HikingTrailService } from './hiking.service';
import { HikingTrailConstants, HikingTrailErrorMessage } from '../shared/constants/HikingTrailConstants';
import { ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION } from '../shared/constants/AnalyticsConstants';
import { MatTabChangeEvent } from '@angular/material';
import { ReviewsService } from '../component/add-review/reviews.service';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
declare let ga: any;

@Component({
  selector: 'app-hiking',
  templateUrl: './hiking.component.html',
  styleUrls: ['./hiking.component.css']
})
export class HikingTrailComponent implements OnInit {
  public trail_id: any;
  public trail: any;
  public isLoaded = true;
  public hikingConstants = new HikingTrailConstants();
  public hikingErrorMessage = new HikingTrailErrorMessage();
  public isShowMore: any;
  public place_reviews: any;
  public parent_id: any;
  public review: string;
  public ratings: string;
  public user_reviews: any;
  public reviews_present: boolean;
  public isErrorVisible: boolean;
  public errorMessage: string;
  public url: string;
  public is_parent_id: boolean;
  public is_review_click: boolean;
  public isSaveVisible: boolean;
  public google_place_reviews_count: number;
  public isSuccessVisible: boolean;

  // json fields
  public stroller_friendly: string;
  public bathrooms: string;
  public entrance_fee: string;
  public parking: string;
  public difficulty: string;
  public carrier: string;
  public ada_accessible: string;
  public picnicing: string;
  public in_park_food: string;
  public emergency_support: string;
  public pet_friendly: string;
  public nearby_camps: string;
  selectedIndex;
  class: any = false;
  @ViewChild('reviewsInput')
  reviewsInput: ElementRef;

  constructor(private route: ActivatedRoute, private http: HttpClient, private titleService: Title, private metaService: Meta,
    private hikingTrailService: HikingTrailService, private reviewService: ReviewsService, private router: Router) {
    this.trail = new HikingTrailModel();
    this.isShowMore = false;
    this.place_reviews = [];
    this.isErrorVisible = false;
    this.errorMessage = '';
    this.url = this.router.url;
    this.is_parent_id = false;
    this.is_review_click = false;
    this.user_reviews = [];
    this.reviews_present = false;
    this.isSaveVisible = false;
    this.selectedIndex = 0;
    this.isSuccessVisible = false;
    this.review = '';
    this.ratings = '';
    this.stroller_friendly = '';
    this.ada_accessible = '';
    this.parking = '';
    this.pet_friendly = '';
    this.in_park_food = '';
    this.nearby_camps = '';
    this.bathrooms = '';
    this.entrance_fee = '';
    this.difficulty = '';
    this.carrier = '';
    this.picnicing = '';
    this.emergency_support = '';
  }

  ngOnInit() {
    this.is_parent_id = false;
    this.parent_id = '';
    this.trail_id = this.route.snapshot.params['id'];
    this.parent_id = this.route.snapshot.queryParams['parent_id'];
    this.is_parent_id = this.parent_id !== undefined && this.parent_id !== '';
    this.is_save_action();
    this.get_reviews();
    if (this.trail_id > 0 && this.trail_id !== undefined) {
      console.log(this.trail_id);
      this.get_trail_data(this.trail_id);
    }
  }

  get_trail_data(trail_id: number) {
    if (trail_id !== undefined) {
      this.hikingTrailService.get_hiking_trail_by_id(trail_id).subscribe(data => {
        console.log(data);
        if (data['trails'] !== undefined) {
          this.trail = data['trails'][0];
          this.format_ratings();
          this.format_ada_accessible();
          this.format_entrance_fee();
          this.format_bathrooms();
          this.format_carrier();
          this.format_parking();
          this.format_stroller_friendly();
          this.format_picnicing();
          this.format_emergency_support();
          this.format_pet_friendly();
          this.format_nearby_camps();
          this.format_in_park_food();
          this.titleService.setTitle(this.trail.name);
          this.metaService.addTag({ name: 'description', content: this.trail.description });
          this.metaService.addTag({
            name: 'keywords',
            content: 'Family friendly hikes in SF bay area, hiking with kids, stroller friendly hikes'
          });

          // OG meta properties
          this.metaService.addTag({ property: 'og:title', content: this.trail.name });
          this.metaService.addTag({ property: 'og:description', content: this.trail.description });
          this.metaService.addTag({ property: 'og:image', content: this.trail.image_urls.first });
          this.metaService.addTag({ property: 'og:url', content: 'https://kinparenting.com/hiking-trails/' + this.trail_id });
          this.metaService.addTag({ property: 'og:site_name', content: 'Kin Parenting' });
          // this.add_analytics_data('CLICK');
        } else {
          this.trail = 0;
          alert(this.hikingErrorMessage.NO_INFO_AVAILABLE);
        }
      }, error => {
        console.log(error);
        alert(this.hikingErrorMessage.GET_DATA_ERROR);
      });
    }
  }

  get_reviews() {
    if (this.user_reviews.length === 0) {
      this.reviewService.get_reviews_by_type('hiking_trail', true, this.trail_id).subscribe(data => {
        console.log(data);
        if (data['status']) {
          this.reviews_present = true;
          this.user_reviews = data['data'];
        } else {
          this.reviews_present = false;
          this.user_reviews = [];
        }
      }, error => {
        // alert(this.trailErrorMessage.GET_DATA_ERROR);
      });
    }
  }

  show_reviews(event: MatTabChangeEvent) {
    const index = event.index;
    console.log('HERE');
    if (index === 1 && this.user_reviews.length === 0) {
      this.reviewService.get_reviews_by_type('hiking_trail', true, this.trail_id).subscribe(data => {
        console.log(data);
        if (data['status']) {
          this.reviews_present = true;
          this.user_reviews = data['data'];
        } else {
          this.reviews_present = false;
          this.user_reviews = [];
        }
      }, error => {
        // alert(this.trailErrorMessage.GET_DATA_ERROR);
      });
    }
  }

  format_ada_accessible() {
    if (this.trail.ada_accessible.yes) {
      this.ada_accessible = 'Is ADA accessible';
    } else {
      this.ada_accessible = 'Is not ADA accessible';
    }
    if (this.trail.ada_accessible.more_info !== 'NA' && this.trail.ada_accessible.more_info.length > 0) {
      this.ada_accessible = this.ada_accessible + ' - ' + this.trail.ada_accessible.more_info;
    }
  }

  format_entrance_fee() {
    if (this.trail.entrance_fee.yes) {
      this.entrance_fee = "$" + this.trail.entrance_fee.min + " - " + "$" + this.trail.entrance_fee.max;
    } else {
      this.entrance_fee = "Free";
    }
    if (this.trail.entrance_fee.more_info !== 'NA' && this.trail.entrance_fee.more_info.length > 0) {
      this.entrance_fee = this.entrance_fee + ' - ' + this.trail.entrance_fee.more_info;
    }
  }

  format_address() {
    let address = '';
    if (this.trail.street) {
      address = this.trail.street + ', ';
    }
    if (this.trail.city) {
      address = address + this.trail.city + ', ';
    }
    if (this.trail.state) {
      address = address + this.trail.state;
    }
    return address;
  }

  format_ratings() {
    this.ratings = '';
    if (this.trail.ratings.google > 0) {
      this.ratings = this.trail.ratings.google + '/5 (Google)      ';
    }
    if (this.trail.ratings.yelp > 0) {
      this.ratings = this.ratings + this.trail.ratings.yelp + '/5 (Yelp)';
    }
  }

  format_stroller_friendly() {
    if (this.trail.stroller_friendly.yes) {
      this.stroller_friendly = 'Is stroller friendly ';
    } else {
      this.stroller_friendly = 'Not stroller friendly ';
    }
    if (this.trail.stroller_friendly.more_info !== 'NA' && this.trail.stroller_friendly.more_info.length > 0) {
      this.stroller_friendly = this.stroller_friendly + ' - ' + this.trail.stroller_friendly.more_info;
    }
  }

  format_pet_friendly() {
    if (this.trail.pet_friendly.yes) {
      this.pet_friendly = 'Is pet friendly ';
    } else {
      this.pet_friendly = 'Not pet friendly ';
    }
    if (this.trail.pet_friendly.more_info !== 'NA' && this.trail.pet_friendly.more_info.length > 0) {
      this.pet_friendly = this.pet_friendly + ' - ' + this.trail.pet_friendly.more_info;
    }
  }

  format_bathrooms() {
    if (this.trail.bathrooms.available) {
      this.bathrooms = 'Bathrooms available';
    } else {
      this.bathrooms = 'No Bathrooms';
    }
    if (this.trail.bathrooms.more_info !== 'NA' && this.trail.bathrooms.more_info.length > 0) {
      this.bathrooms = this.bathrooms + ' - ' + this.trail.bathrooms.more_info;
    }
  }

  format_parking() {
    if (this.trail.parking.available) {
      this.parking = 'Parking available';
    } else {
      this.parking = 'No Parking';
    }
    if (this.trail.parking.more_info !== 'NA' && this.trail.parking.more_info.length > 0) {
      this.parking = this.parking + " - " + this.trail.parking.more_info;
    }
  }

  format_difficulty() {
    if (this.trail.difficulty.more_info !== 'NA' && this.trail.difficulty.more_info.length > 0) {
      return this.trail.difficulty.level + " - " + this.trail.difficulty.more_info;
    } else {
      return this.trail.difficulty.level;
    }
  }

  format_carrier() {
    if (this.trail.carrier.needed) {
      this.carrier = 'Carrier needed';
    } else {
      this.carrier = 'No carrier needed';
    }
    if (this.trail.carrier.more_info !== 'NA' && this.trail.carrier.more_info.length > 0) {
      this.carrier = this.carrier + " - " + this.trail.carrier.more_info;
    }
  }

  format_picnicing() {
    if (this.trail.picnicing.yes) {
      this.picnicing = 'Picnic tables available';
    } else {
      this.picnicing = 'No picnic tables available';
    }
    if (this.trail.picnicing.more_info !== 'NA' && this.trail.picnicing.more_info.length > 0) {
      this.picnicing = this.picnicing + " - " + this.trail.picnicing.more_info;
    }
  }

  format_emergency_support() {
    if (this.trail.emergency_support.available) {
      this.emergency_support = 'Emergency support available within 5 miles';
    } else {
      this.emergency_support = 'No emergency support available within 5 miles';
    }
    if (this.trail.emergency_support.more_info !== 'NA' && this.trail.emergency_support.more_info.length > 0) {
      this.emergency_support = this.emergency_support + " - " + this.trail.emergency_support.more_info;
    }
  }

  format_in_park_food() {
    if (this.trail.in_park_food.available) {
      this.in_park_food = 'In park food options available';
    } else {
      this.in_park_food = 'No in park food options available';
    }
    if (this.trail.in_park_food.more_info !== 'NA' && this.trail.in_park_food.more_info.length > 0) {
      this.in_park_food = this.in_park_food + " - " + this.trail.in_park_food.more_info;
    }
  }

  format_nearby_camps() {
    if (this.trail.nearby_camps.yes) {
      this.nearby_camps = 'Nearby camping available';
    } else {
      this.nearby_camps = 'No nearby camping';
    }
    if (this.trail.nearby_camps.more_info !== 'NA' && this.trail.nearby_camps.more_info.length > 0) {
      this.nearby_camps = this.nearby_camps + " - " + this.trail.nearby_camps.more_info;
    }
  }

  maps_redirect() {
    const search_query = this.trail.name + "," + this.trail.city;
    window.open('https://www.google.com/maps?q=' + search_query, '_blank');
  }

  save_trail() {
    if (this.parent_id !== undefined) {
      this.add_analytics_data('SAVE');
      this.isSaveVisible = true;
    }
  }


  add_review_redirect(index: number): void {
    if (this.parent_id != undefined) {
      this.is_parent_id = true;
      this.is_review_click = true;
      this.selectedIndex = index;
      this.reviewsInput.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }


  add_review() {
    if (this.validate_review()) {
      this.isErrorVisible = false;
      const input_data = {
        'input': {
          'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.HIKING_TRAIL,
          'entity_id': this.trail_id,
          'parent_id': this.parent_id,
          'review': this.review,
          'is_approved': false
        }
      };
      this.reviewService.add_review(input_data).subscribe(data => {
        if (data['status'] === true) {
          this.isErrorVisible = false;
          this.isSuccessVisible = true;
          setTimeout(() => {
            this.isSuccessVisible = false;
            this.review = '';
          }, 3000);
          this.errorMessage = 'Review added successfully';
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
      this.isErrorVisible = true;
      this.errorMessage = 'Review is required';
      setTimeout(() => {
        this.isErrorVisible = false;
      }, 3000);
      return false;
    }
    this.isErrorVisible = false;
    return true;
  }
  closeErrorBox() {
    this.isErrorVisible = false;
  }


  is_save_action() {
    this.reviewService.verify_save_action(this.parent_id,
      ANALYTICS_ENTITY_TYPES_ENUM.HIKING_TRAIL, this.trail_id).subscribe(data => {
        if (data['status'] === true) {
          this.isSaveVisible = true;
        } else {
          this.isSaveVisible = false;
        }
      }, error => {
      });
  }


  // Add Analytics Data
  add_analytics_data(atype: any) {
    let action = '';
    switch (atype) {
      case 'CLICK':
        action = ACTION.CLICK;
        break;
      case 'SAVE':
        action = ACTION.SAVE;
        break;
    }
    let analytics_input = {};
    if (this.parent_id !== undefined) {
      analytics_input = {
        'input_data': [{
          'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.HIKING_TRAIL,
          'entity_id': this.trail_id,
          'interface': INTERFACE_ENUM.FE,
          'parent_id': this.parent_id,
          'action': action,
          'referrer': '/root/home'
        }]
      };
    } else {
      analytics_input = {
        'input_data': [{
          'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.HIKING_TRAIL,
          'entity_id': this.trail_id,
          'interface': INTERFACE_ENUM.FE,
          'action': action,
          'referrer': '/root/home'
        }]
      };
    }
    this.reviewService.add_analytics_actions(analytics_input).subscribe(data => {
      if (this.parent_id !== undefined && atype === 'CLICK') {
        this.is_parent_id = true;
        this.is_save_action();
      }
    }, error => {
    });
  }

  trail_redirect() {
    ga('send', 'trail', {
      eventCategory: 'Clicks',
      eventLabel: 'More Details',
      eventAction: 'Click on more details button',
      eventValue: this.trail_id
    });
    window.open(this.trail.url, '_blank');
  }

  addReviewSection(event) {
    console.log(event);
    if (event == false) {
      this.class = true;
    } else {
      this.class = false;
    }

  }

}
