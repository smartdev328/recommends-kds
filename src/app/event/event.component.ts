import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import {UrlConstants} from '../constants/UrlConstants';
import {ENTITY_TYPES_ENUM, TYPES_ENUM } from '../constants/VenueConstants';
import {EventErrorMessage } from '../constants/EventConstants';
import {ReviewsService} from '../add-review/reviews.service';
import { MatTabChangeEvent } from '@angular/material';
import {ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION} from '../constants/AnalyticsConstants';


declare let ga: any;
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  event_id: string;
  event: any;
  isLoaded: boolean = false;
  public is_parent_id: Boolean;
  public isErrorVisible: Boolean;
  public isSuccessVisible: Boolean;
  public isSaveVisible: Boolean;
  public errorMessage: String;
  public review: string;
  public user_reviews: any;
  public parent_id: any;
  public eventErrorMessage = new EventErrorMessage();
  public URLConstatnts = new UrlConstants();
  selectedIndex;
  constructor(private route: ActivatedRoute, private http: HttpClient, private titleService: Title,
    private reviewService: ReviewsService) { }

  ngOnInit() {
    this.event_id = this.route.snapshot.params['id'];
    this.parent_id = this.route.snapshot.queryParams['parent_id'];
    this.get_event_details();
    if (!isNaN( this.parent_id)) {
      this.is_save_action();
    }
    this.isErrorVisible = false;
    this.isSuccessVisible = false;
    this.isSaveVisible = false;
    this.errorMessage = '';
    this.review = '';
    this.user_reviews = [];
    this.selectedIndex = 0;
  }

  get_event_details() {
    // let url = 'https://kin-api.kinparenting.com/events/' + this.event_id;
    let url = this.URLConstatnts.API_URL + 'events/' + this.event_id + '/';
    const headers = new HttpHeaders()
        .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk');
    this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
      data = data.replace(/\n/g, "");
      data = JSON.parse(data);
      this.event = data["event"];
      this.add_analytics_data('CLICK');
      this.isLoaded = true;
      ga('send', 'event', {
        eventCategory: 'Views',
        eventLabel: 'Event Details',
        eventAction: 'View a specific event page',
        eventValue: this.event_id
      });
      this.titleService.setTitle(this.event.name);
    })
  }

  format_time(timeString) {
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = (H < 12 || H === 24) ? "AM" : "PM";
    timeString = h + timeString.substr(2, 3) + ampm;
    return timeString;
  }

  format_price() {
    if(this.event.price == "Free" || this.event.price == "free" || this.event.price == "") {
      return "Free"
    }
    else {
      return "From $" + this.event.price;
    }
  }

  format_age() {
    if(this.event.min_age == 0 && this.event.max_age == 99) {
      return "Good for all ages";
    }
    if(this.event.min_age != 0 && this.event.max_age == 99) {
      return "Good for " + this.event.min_age + " years and above";
    }
    else {
      return "Good for " + this.event.min_age + " to " + this.event.max_age + " years";
    } 
  }

  maps_redirect() {
    var search_query = this.event.venue + "," + this.event.street + "," + this.event.city;
    window.location.href= 'https://www.google.com/maps?q=' + search_query;
  }

  event_redirect() {
    ga('send', 'event', {
      eventCategory: 'Clicks',
      eventLabel: 'More Details',
      eventAction: 'Click on more details button',
      eventValue: this.event_id
    });
    window.location.href= this.event.url;
  }

  add_review_redirect(index: number): void {
    if (!isNaN( this.parent_id)) {
       this.is_parent_id = true;
       this.selectedIndex = index;
     }
  }

  add_review() {
    if (this.validate_review()) {
      let input_data = {
        'input' : {
          'entity_type' : ENTITY_TYPES_ENUM.EVENT,
          'entity_id' : this.event_id,
          'parent_id' : this.parent_id,
          'review' : this.review,
          'is_approved' : false
        }
      };
      this.reviewService.add_review(input_data).subscribe(data => {
        if (data['status'] === true) {
          this.isSuccessVisible = true;
          this.isErrorVisible = false;
          setTimeout(()=> {    
                this.isSuccessVisible = false;
                this.review = '';
           }, 3000);

          this.errorMessage = this.eventErrorMessage.REVIEW_ADDED_SUCCESS;
        } else {
          this.isErrorVisible = true;
          this.errorMessage = this.eventErrorMessage.ERROR_ADDING_NEW_REVIEW;
        }
      }, error => {
        this.isErrorVisible = true;
        this.errorMessage = this.eventErrorMessage.SOMETHING_WENT_WRONG;
      });


    }
  }

  validate_review() {
    if (this.review.trim().length === 0) {
      this.isErrorVisible = true;
      this.errorMessage = 'Review is required';
      setTimeout(()=> {    
        this.isErrorVisible  = false;
      }, 3000);
      return false;
    }
    this.isErrorVisible = false;
    return true;
  }

  show_reviews(event: MatTabChangeEvent) {
 
    let tab = event.tab;
    let index = event.index;
  
    if (index === 1 && this.user_reviews.length === 0) {
      this.reviewService.get_reviews_by_type(TYPES_ENUM.EVENT , true).subscribe(data => {
        if ( data['status'] ) {
          this.user_reviews = data['data'];
        } else {
          this.user_reviews = [];
        }
      }, error => {
        alert(this.eventErrorMessage.GET_DATA_ERROR);
      });
    }
  }

  calendar_redirects() {
    this.add_analytics_data('CALENDAR');
    window.open('https://calendar.google.com');
  }
  website_redirect() {
    if (!isNaN( this.parent_id)) {
      this.add_analytics_data('SAVE');
      this.isSaveVisible = true;
   }
  }

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
     }
     let analytics_input = {};
     if (!isNaN( this.parent_id)) {
         analytics_input = {
        'input_data' : [ {
         'entity_type' : ANALYTICS_ENTITY_TYPES_ENUM.EVENT,
         'entity_id' : this.event_id,
         'interface' : INTERFACE_ENUM.FE,
         'parent_id' : this.parent_id,
         'action' : action,
         'referrer' : '/root/home'
        } ]
      };
    } else {

        analytics_input = {
        'input_data' : [ {
         'entity_type' : ANALYTICS_ENTITY_TYPES_ENUM.EVENT,
         'entity_id' : this.event_id,
         'interface' : INTERFACE_ENUM.FE,
         'action' : action,
         'referrer' : '/root/home'
        } ]
      };
    }
     this.reviewService.add_analytics_actions(analytics_input).subscribe(data => {
     }, error => {
       alert('Something went wrong');
     });
 
  }
  is_save_action() {
    this.reviewService.verify_save_action(this.parent_id, ANALYTICS_ENTITY_TYPES_ENUM.EVENT, this.event_id).subscribe(data => {
      if (data['status'] === true) {
        this.isSaveVisible = true;
      } else {
        this.isSaveVisible = false;
      }
    }, error => {
    });
  }
}
