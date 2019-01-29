import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import {UrlConstants} from '../constants/UrlConstants';
import {ReviewsService} from '../add-review/reviews.service';
import {ENTITY_TYPES_ENUM, TYPES_ENUM } from '../constants/VenueConstants';
import {ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION} from '../constants/AnalyticsConstants';

import {CampErrorMessage, CampConstants } from '../constants/CampConstants';
import { MatTabChangeEvent } from '@angular/material';
declare let ga: any;
@Component({
  selector: 'app-camps',
  templateUrl: './camps.component.html',
  styleUrls: ['./camps.component.css']
})
export class CampsComponent implements OnInit {
  camp_id: string;
  camp: any;
  isLoaded: boolean = false;
  public is_parent_id: Boolean;
  public isErrorVisible: Boolean;
  public isSuccessVisible: Boolean;
  public errorMessage: String;
  public review: string;
  public user_reviews: any;
  public parent_id: any;
  public category: string;
  public campStatus: Boolean;
  public campErrorMessage = new CampErrorMessage();
  public campConstants: any;
  public URLConstatnts = new UrlConstants();

  constructor(private route: ActivatedRoute, private http: HttpClient, private titleService: Title,
    private reviewService: ReviewsService) { }

  ngOnInit() {
    this.is_parent_id = false;
    this.parent_id = '';
    this.camp_id = this.route.snapshot.params['id'];
    this.parent_id = this.route.snapshot.queryParams['parent_id'];
    this.get_camp_details();
    this.isErrorVisible = false;
    this.isSuccessVisible = false;
    this.errorMessage = '';
    this.review = '';
    this.camp  = [];
    this.user_reviews = [];
    this.category = '';
    this.camp.name = '';
    this.camp.image_url = '';
    this.category = '';
    this.campStatus = false;
    this.campConstants = new CampConstants();

      this.add_analytics_data('CLICK');
  }
  get_camp_details() {
    let url = this.URLConstatnts.API_URL + 'camps/' + this.camp_id+"/";
 
    const headers = new HttpHeaders()
        .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk');
        this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
          data = data.replace(/\n/g, "");
          data = JSON.parse(data);
          if (data['status']) {
            this.campStatus = true;
            this.camp = data["data"]['0'];
          if (this.camp.category !== undefined && this.camp.category > 0) {

          this.category = this.campConstants.CAMP_CATEGORY.find(x=>x.id ==this.camp.category).name;
         } else {
          this.category ='No information available for now';
          }
          this.camp.lunch = this.camp.misc['lunch'];
          this.camp.image_url  = this.camp.image_url;
          this.camp.timings = this.camp.misc['timings'];
          this.isLoaded = true;
        } else{
          alert('No camp information available for now');
        }
      })

  }
  show_reviews(event: MatTabChangeEvent) {
 
    let tab = event.tab;
    let index = event.index;
    if (index === 1 && this.user_reviews.length === 0) {
      this.reviewService.get_reviews_by_type(TYPES_ENUM.CAMP , true).subscribe(data => {
        if ( data['status'] ) {
          this.user_reviews = data['data'];
        } else {
          this.user_reviews = [];
        }
      }, error => {
        alert(this.campErrorMessage.GET_DATA_ERROR);
      });
    }
  }
  event_redirect() {
    ga('send', 'camp', {
      eventCategory: 'Clicks',
      eventLabel: 'More Details',
      eventAction: 'Click on more details button',
      eventValue: this.camp_id
    });
    window.location.href= this.camp.url;
  }

  add_review_redirect() {
    if(this.parent_id != undefined) {
     this.is_parent_id = true;
     }
  }

  add_review() {
    if (this.validate_review()) {
      let input_data = {
        'input' : {
          'entity_type' : ENTITY_TYPES_ENUM.CAMP,
          'entity_id' : this.camp_id,
          'parent_id' : 1,
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

          this.errorMessage = this.campErrorMessage.REVIEW_ADDED_SUCCESS;
        } else {
          this.isErrorVisible = true;
          this.errorMessage = this.campErrorMessage.ERROR_ADDING_NEW_REVIEW;
        }
      }, error => {
        this.isErrorVisible = true;
        this.errorMessage = this.campErrorMessage.SOMETHING_WENT_WRONG;
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

  format_age() {
    if(this.camp.min_age == 0 && this.camp.max_age == 99) {
      return "Good for all ages";
    }
    if(this.camp.min_age != 0 && this.camp.max_age == 99) {
      return "Good for " + this.camp.min_age + " years and above";
    }
    else {
      return "Good for " + this.camp.min_age + " to " + this.camp.max_age + " years";
    } 
  }

    format_time(timeString) {
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = (H < 12 || H === 24) ? "AM" : "PM";
    timeString = h + timeString.substr(2, 3) + ampm;
    return timeString;
  }

  calendar_redirects() {
    this.add_analytics_data('CALENDAR');
    window.open('https://calendar.google.com');
  }
  website_redirect() {
    this.add_analytics_data('SAVE');
    window.open(this.camp.url, '_blank');
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
         'entity_type' : ANALYTICS_ENTITY_TYPES_ENUM.CAMP,
         'entity_id' : this.camp_id,
         'interface' : INTERFACE_ENUM.FE,
         'parent_id' : this.parent_id,
         'action' : action,
         'referrer' : '/root/home'
        } ]
      };
    } else {
        analytics_input = {
        'input_data' : [ {
         'entity_type' : ANALYTICS_ENTITY_TYPES_ENUM.CAMP,
         'entity_id' : this.camp_id,
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
}
