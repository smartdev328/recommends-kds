import { Component, ViewChild, OnInit, ElementRef, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { UserSearch } from '../venue.model';
import { VenuesService } from './venues.service';
import { ENTITY_TYPES_ENUM, TYPES_ENUM, VenueConstants, VenueErrorMessage } from '../../shared/constants/VenueConstants';
import { ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION } from '../../shared/constants/AnalyticsConstants';
import { MatTabChangeEvent, MatDialog } from '@angular/material';
import { ReviewsService } from '../../component/add-review/reviews.service';
import { AuthService } from '@shared/service/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';
declare let ga: any;
@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent implements OnInit {
  entity_type: string;
  isExploreTrail: boolean;
  showMoreTrail: boolean;
  isExplore: boolean;
  trail_list: any=[];
  event_list: any=[];
  start = 0;
  end = 4;
  startTrail = 0;
  endTrail = 4;
  showMore = false;
  showLayout = false;
  @ViewChild('deleteuser')deleteuser: TemplateRef<any>

  dialogRef:any;
  modalRef: BsModalRef;
  ClickName:any;

  subscribe="follow this place";
  saveEvent="save this place  ";
  addToReview="add a review ";
  public dayOfWeek: any;
  public venue_id: any;
  public venue: any;
  public isLoaded = true;
  public parking: String;
  public tips_for_parent: String;
  public rating: Number;
  public place_reviews_length: Number;
  public jsonMiscData: String;
  public miscData: any;
  public venueConstatnts = new VenueConstants();
  public venueErrorMessage = new VenueErrorMessage();
  public timings_array: any;
  public isShowMore: any;
  public place_full_info: any;
  public place_reviews: any;
  public category: string;
  public avg_rating: number;
  public google_rating_out_of: number;
  //public parent_id: any;
  public review: string;
  public user_reviews: any;
  public reviews_present: Boolean;
  public isErrorVisible: Boolean;
  public errorMessage: String;
  public url: String;
  //public is_parent_id: Boolean;
  public is_review_click: Boolean;
  public isSubscribeVisible: Boolean;
  public isSaveVisible: Boolean;
  public google_place_reviews_count: number;
  public isShowMoreHours: Boolean;
  public price: any;

  city: String;
  state: String;
  public street: String;
  public isSuccessVisible: Boolean;
  public contact_number: String;
  public isAuthenticated$: Observable<boolean>;
  isLogedin = false;
  selectedIndex;
  class: any = false;
  @ViewChild('reviewsInput')
  reviewsInput: ElementRef;
  currentUrl: string;
  constructor(private route: ActivatedRoute, private http: HttpClient, private titleService: Title,
    private metaService: Meta,private authService: AuthService, private venuesService: VenuesService, private reviewService: ReviewsService,
    private router: Router,public dialog: MatDialog) {
    this.venue = new UserSearch();
    this.parking = '';
    this.rating = 0;
    this.tips_for_parent = '';
    this.timings_array = [];
    this.isShowMore = false;
    this.place_full_info = {};
    this.place_reviews = [];
    this.category = '';
    this.google_rating_out_of = this.venueConstatnts.GOOGLE_RATING_OUT_OF;
    this.isErrorVisible = false;
    this.errorMessage = '';
    this.url = this.router.url;
    //this.is_parent_id = false;
    this.is_review_click = false;
    this.user_reviews = [];
    this.reviews_present = false;
    this.isShowMoreHours = false;
    this.isSubscribeVisible = false;
    this.isSaveVisible = false;
    this.selectedIndex = 0;
    this.city = '';
    this.state = '';
    this.street = '';
    this.isSuccessVisible = false;
    this.review = '';
    const currentDate = new Date();
    this.dayOfWeek = currentDate.getDay();
    this.dayOfWeek = this.dayOfWeek - 1; // To get array value
    this.price = 0;
    this.contact_number = '';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        this.currentUrl= event.urlAfterRedirects;
        ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    //this.is_parent_id = false;
   // this.parent_id = '';
    this.venue_id = this.route.snapshot.params['id'];
    //this.parent_id = this.route.snapshot.queryParams['parent_id'];
    //this.is_parent_id = this.parent_id !== undefined && this.parent_id !== '';
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.isAuthenticated$.subscribe(data => {
      this.isLogedin = data;
      this.authService.setAuth(this.isLogedin);
    })
    this.is_save_action();
    this.show_reviews();
    if (this.venue_id > 0 && this.venue_id !== undefined) {
      this.get_venue_data(this.venue_id);

    }

  }
  loadMore() {
    if (this.event_list.length > this.end) {
      this.end = this.end + 4;
    }
    if (this.event_list.length < this.end) {
      this.showMore = false;
    }
  }

  loadMoreTrail() {
    if (this.trail_list.length > this.endTrail) {
      this.endTrail = this.endTrail + 4;
    }
    if (this.trail_list.length < this.endTrail) {
      this.showMoreTrail = false;
    }
  }

  get_venue_data(venue_id: number) {
    if (venue_id !== undefined) {
      const url = 'https://kin-api-dev.kinparenting.com/' + 'venues/' + venue_id + '/';
      const headers = new HttpHeaders();
      this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
        data = data.replace(/\n/g, '');
        data = JSON.parse(data);
      // this.venuesService.get_venue_by_id(venue_id).subscribe(data => {
        if (data['venue'] !== undefined) {
          this.venue = data['venue'];

          if(data['events'].length>0){
            this.showMore = true;
            this.entity_type ="eventData"

            this.event_list = data['events'];
            if (this.event_list.length > this.end) {
              this.showMore = true;
            }
            this.isExplore = false;
          }

          else if(data['trails'].length>0){
            
            this.showMoreTrail = true;
            this.trail_list = data['trails'];
            this.entity_type ="Hiking Trail"
            console.log(this.entity_type);
            if (this.trail_list.length > this.endTrail) {
              this.showMoreTrail = true;
            }
            this.isExploreTrail = false
          }
          this.category = this.venue.category !== undefined && this.venue.category.length > 0 ? this.venue.category.join() :
            0;
          this.venue.perm_close = this.venue.perm_closed === true ? '1' : '0';
          this.venue.sec_cat = this.venue.sec_cat;
          this.city = this.venue.city;
          this.state = this.venue.state;
          this.price = this.venue.price;
          this.street = this.venue.street;
          this.contact_number = this.venue.contact_number;
          this.parking = this.venue.misc.parking === undefined || this.venue.misc.parking.trim().length === 0 ?
            0 : this.venue.misc.parking;
          this.tips_for_parent = this.venue.misc.tips_for_parent === '' ? '' : this.venue.misc.tips_for_parent;
          this.rating = this.venue.rating === '' ? 0 : this.venue.rating;
          this.jsonMiscData = JSON.stringify(this.venue.misc);
          this.miscData = this.venue.misc;
          this.venue.description = this.venue.description === undefined || this.venue.description.trim().length === 0 ?
            0 : this.venue.description.trim();
          this.venue.image_url = this.venue.image_url === '' || this.venue.image_url === undefined ?
            '../../assets/venue_default_image.png'
            : this.venue.image_url;
          if (this.venue.timings === null || this.venue.timings === '' || this.venue.timings === 0) {
            this.isShowMoreHours = false;
            this.timings_array = 0;
          } else {
            this.isShowMoreHours = true;
            this.timings_array = this.create_timing_json(this.venue.timings);
          }
          this.place_full_info = this.venue.misc.place_full_info;
          this.place_reviews = this.place_full_info === undefined ? [] : this.place_full_info.reviews;
          if (this.place_reviews !== undefined) {
            this.place_reviews_length = this.place_reviews.lenght;
            this.avg_rating = this.calculate_avg_rating(this.place_reviews);
          } else {
            this.avg_rating = 0;
            this.place_reviews_length = 0;
          }
          this.titleService.setTitle(this.venue.name);
          this.metaService.addTag({ name: 'description', content: this.venue.description });
          this.metaService.addTag({
            name: 'keywords',
            content: 'Family friendly places in SF bay area, kid friendly places, activities'
          });

          // OG meta properties
          this.metaService.addTag({ property: 'og:title', content: this.venue.name });
          this.metaService.addTag({ property: 'og:description', content: this.venue.description });
          this.metaService.addTag({ property: 'og:image', content: this.venue.image_url });
          this.metaService.addTag({ property: 'og:url', content: 'https://kinparenting.com/venues/' + this.venue_id });
          this.metaService.addTag({ property: 'og:site_name', content: 'Kin Parenting' });
          this.add_analytics_data('CLICK');
        } else {
          this.venue = 0;
          alert(this.venueErrorMessage.NO_INFO_AVAILABLE);
        }
      }, error => {
        alert(this.venueErrorMessage.GET_DATA_ERROR);
      });
    }
  }

  show_reviews() {
    if (this.user_reviews.length === 0) {
      this.reviewService.get_reviews_by_type(TYPES_ENUM.VENUE, true, this.venue_id).subscribe(data => {
        if (data['status']) {
          this.reviews_present = true;
          this.user_reviews = data['data'];
        } else {
          this.reviews_present = false;
          this.user_reviews = [];
        }
      }, error => {
        // alert(this.venueErrorMessage.GET_DATA_ERROR);
      });
    }
  }

  format_price() {
    if (this.venue.price == "Free" || this.venue.price == "free" || this.venue.price == "") {
      return "Free";
    } else {
      return "From $" + this.venue.price;
    }
  }

  maps_redirect() {
    const search_query = this.venue.name + "," + this.venue.city;
    window.open('https://www.google.com/maps?q=' + search_query, '_blank');
  }

  save_venue() {
    //if (this.parent_id !== undefined) {
      this.add_analytics_data('SAVE');
      this.isSaveVisible = true;
    //}
  }

  calendar_redirects() {
    this.add_analytics_data('CALENDAR');
    window.open('https://calendar.google.com');
  }

  create_timing_json(timing_slots: String) {
    if (timing_slots.trim().length === 0) {
      return [];
    }
    return timing_slots.split(',');
  }

  showMoreHours() {

    this.isShowMore = !this.isShowMore;
  }

  calculate_avg_rating(google_reviews) {
    let total_ratings = 0;
    if (google_reviews.length) {
      google_reviews.forEach(function (each_element) {
        total_ratings += each_element['rating'];
      });
      return total_ratings / google_reviews.length;
    }
    return 0;
  }

  add_review_redirect(index: number): void {
    //if (this.parent_id != undefined) {
      //this.is_parent_id = true;
      this.is_review_click = true;
      this.selectedIndex = index;
      this.reviewsInput.nativeElement.scrollIntoView({ behavior: 'smooth' });
    //}
  }


  add_review() {
    if (this.validate_review()) {
      this.isErrorVisible = false;
      const input_data = {
        'input': {
          'entity_type': ENTITY_TYPES_ENUM.VENUE,
          'entity_id': this.venue_id,
          'parent_id': null,
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
  is_subscription_venue() {
    this.venuesService.verify_subscribe_venue(null, this.venue_id).subscribe(data => {
      if (data['status'] === true) {
        this.isSubscribeVisible = true;
      } else {

        this.isSubscribeVisible = false;
      }
    }, error => {
    });
  }

  is_save_action() {
    this.reviewService.verify_save_action(null, ANALYTICS_ENTITY_TYPES_ENUM.VENUE, this.venue_id).subscribe(data => {
      if (data['status'] === true) {
        this.isSaveVisible = true;
      } else {
        this.isSaveVisible = false;
      }
    }, error => {
    });
  }

  is_delete_action() {
    this.reviewService.delete_action(this.venue_id,ANALYTICS_ENTITY_TYPES_ENUM.VENUE).subscribe(data => {
      if (data['status'] === true) {
        this.isSaveVisible = false;
      } else {
        this.isSaveVisible = true;
      }
    }, error => {
    });
  }

  add_subscription_venue() {

    //if (this.parent_id !== undefined) {
      const input_data = {
        "venue_subs_data": {
          //"parent_id": this.parent_id,
          "venue_id": this.venue_id,
        }
      };
      this.venuesService.add_subscriptions(input_data).subscribe(data => {
        console.log(data);
        if (data['status'] === true) {
          this.isSubscribeVisible = true;
        } else {
          alert('Something went wrong while subscribe venue');
        }
      }, error => {
        alert('Something went wrong while subscribe venue');
      });
      this.add_analytics_data('SUBSCRIBE');
    //}
  }

  unsubscribe_venue() {

   // if (this.parent_id !== undefined) {
      this.venuesService.remove_subscriptions(null, this.venue_id).subscribe(data => {
        if (data['status'] === true) {
          this.isSubscribeVisible = false;
        }
      }, error => {
        this.errorMessage = 'Something went wrong while subscribe venue';
      });
      // this.add_analytics_data('SUBSCRIBE');
    //}


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
      case 'CALENDAR':
        action = ACTION.CALENDAR;
        break;
      case 'SUBSCRIBE':
        action = ACTION.SUBSCRIBE;
        break;
    }
    let analytics_input = {};
    //if (this.parent_id !== undefined) {
      analytics_input = {
        'input_data': [{
          'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.VENUE,
          'entity_id': this.venue_id,
          'interface': INTERFACE_ENUM.FE,
         // 'parent_id': this.parent_id,
          'action': action,
          'referrer': '/root/home'
        }]
      };
    //}
    //  else {
    //   analytics_input = {
    //     'input_data': [{
    //       'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.VENUE,
    //       'entity_id': this.venue_id,
    //       'interface': INTERFACE_ENUM.FE,
    //       'action': action,
    //       'referrer': '/root/home'
    //     }]
    //   };
    // }
    this.reviewService.add_analytics_actions(analytics_input).subscribe(data => {
      if (atype === 'CLICK') {
        //this.is_parent_id = true;
        this.is_subscription_venue();
        this.is_save_action();
      }
    }, error => {
    });
  }

  venue_redirect() {
    ga('send', 'venue', {
      eventCategory: 'Clicks',
      eventLabel: 'More Details',
      eventAction: 'Click on more details button',
      eventValue: this.venue_id
    });
    window.open(this.venue.url, '_blank');
  }
  addReviewSection(event) {
    if (event == false) {
      this.class = true;
    } else {
      this.class = false;
    }

  }
  deleteUser(linkName){
    this.ClickName = linkName;
    this.dialogRef = this.dialog.open(this.deleteuser, {
        width: "626px"
    });
}

//this function will open a popup when user is not loggen in
checklogin(linkName){
  if(this.isLogedin){
    if(linkName == this.subscribe){
      this.add_subscription_venue();
    }
    else if(linkName == this.saveEvent){
     this.save_venue();
    } else if(linkName == this.addToReview){
      this.add_review_redirect(2);
    } 
}else{
this.deleteUser(linkName);
}
}
signin(){
  sessionStorage.setItem('current_url', JSON.stringify(this.currentUrl))
  this.authService.login();
  this.closeDialog();
  }
  closeDialog(){
    this.dialogRef.close();
    }

}
