import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {UrlConstants} from '../constants/UrlConstants';
import {ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION} from '../constants/AnalyticsConstants';
import {ReviewsService} from '../add-review/reviews.service';
import { EventConstants } from '../constants/EventConstants';
import { VenueConstants, VenueErrorMessage } from '../constants/VenueConstants';
import { ErrorMessage } from '../constants/CommonConstants';
import { VenueListingService } from './venue-listing.service';

declare let ga: any;
@Component({
  selector: 'app-venue-listing',
  templateUrl: './venue-listing.component.html',
  styleUrls: ['./venue-listing.component.css']
})
export class VenueListingComponent implements OnInit {
  venues_list;
  isExplore: Boolean = false;
  public category: string;
  public URLConstatnts = new UrlConstants();
  public locations:any;
  showMore: boolean = false; 
  start = 0; 
  end = 20;
  oldFilterData = true;
  newFilterData = false;
  public isErrorVisible: Boolean;
  public isFilterErrorVisible: Boolean;
  public errorMessage: String;
  public filterErrorMessage: String;
  public eventConstatnts = new EventConstants();
  public venueConstants = new VenueConstants();
  public commonErrorMessage = new ErrorMessage();
  public venueErrorMessage = new VenueErrorMessage();
  public categoryList = this.venueConstants.PRIMARY_CATEGORY;
  
  /*
    Filter Variables
  */
  public selected_cat : string;
  public selected_loc : String;
  public keyword : String;
  public cat_label : String;
  public loc_label : String;
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private datePipe: DatePipe,
              private router: Router,
              private titleService: Title,
              private reviewService: ReviewsService,
              private venueListingService :  VenueListingService
               ) { 
                /*
                  Filter Variables
                */
               this.selected_cat = '';
               this.selected_loc = '';
               this.keyword = '' ;
               this.cat_label = 'Category';
               this.loc_label = 'Location';
                this.router.events.subscribe(event => {
                  if (event instanceof NavigationEnd) {
                    ga('set', 'page', event.urlAfterRedirects);
                    ga('send', 'pageview');
                  }
                });
                this.locations = this.venueConstants.LOCATIONS;
              }

  ngOnInit() {
    this.errorVisible = false;
    this.errorMessage = '';
    this.isFilterErrorVisible = false;
    this.filterErrorMessage = '';
    this.titleService.setTitle('Venues');
    this.category = this.route.snapshot.queryParams['category'];
    this.get_venue_details();
  }

  get_venue_details() {
    if(this.venues_list) {
      this.isExplore = true;
    } else {
      let url = '';
      if (this.category === undefined ) {
      	url = 'https://kin-api-dev.kinparenting.com/venues/?limit=100' ;
     } else {
        url = 'https://kin-api-dev.kinparenting.com/venues/?categories=' + this.category;
     }
      this.isExplore = true;
      const headers = new HttpHeaders()
          .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk');
      this.http.get(url, { headers: headers, responseType: 'text' }).
      subscribe(data => {
          data = data.replace(/\n/g, '');
          data = JSON.parse(data);
          this.venues_list = data['venues'];
          if(this.venues_list.length > this.end ){
            this.showMore = true;
          } 
         // this.add_analytics_data();
          this.isExplore = false;
      });
    }
  }
  loadMore(){

    if(this.venues_list.length > this.end ){
        this.end = this.end + 20;
    } 
     if(this.venues_list.length < this.end) {
      this.showMore = false;
    } 

  }

  add_analytics_data() {
    const final_data = {
      'input_data': []
    };
    const input_final_data = [];
    for (let i = 0; i <  this.venues_list.length; i++) {
      const final_key_value_pair = {
        'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.VENUE,
        'entity_id': undefined,
        'interface': INTERFACE_ENUM.FE,
        'action': ACTION.VIEW,
        'referrer': '/root/home'
      };
      final_key_value_pair['entity_id'] =  this.venues_list[i].id;
      input_final_data.push(final_key_value_pair);
    }
    final_data['input_data'] = input_final_data;
    this.reviewService.add_analytics_actions(final_data).subscribe(data => {
    }, error => {
      alert('Something went wrong');
    });
  }

  kin_redirect() {
    ga('send', 'venue', {
      eventCategory: 'Clicks',
      eventLabel: 'Kin Redirect',
      eventAction: 'Click on kin redirect button'
    });
    window.location.href='http://m.me/kinparenting';
  }

  onLocationChange(loc_obj : object){
    this.selected_loc = loc_obj['name'];
    this.loc_label = this.selected_loc;
  }
  onCategoryChange(cat_obj : object){
    this.selected_cat = cat_obj['name'];
    this.cat_label = this.selected_cat;
  }

  clear_filter_data() {
	this.selected_cat = '';
	this.selected_loc = '';
	this.loc_label = 'None';
	this.cat_label = 'None';
	this.keyword = '';
	this.isFilterErrorVisible = false;
	this.isErrorVisible = false;
	this.errorMessage = '';
        this.filterErrorMessage = '';
  }

  filter_venue_data() {
    if (this.selected_cat === '' && this.keyword === '' && this.selected_loc === '') {
	this.isFilterErrorVisible = true;
	this.isErrorVisible = false;
	this.errorMessage = '';
        this.filterErrorMessage = this.commonErrorMessage.SELECT_FILTER_CRITERIA;
    } else {
	this.isFilterErrorVisible = false;
	this.filterErrorMessage = '';
      const input = {
        'categories': this.selected_cat === undefined ? '' : this.selected_cat,
        'q': this.keyword === undefined ? '' : this.keyword.trim(),
        'location': this.selected_loc === undefined ? '' : this.selected_loc
      };
      this.showMore = false;
      this.isExplore = true;
      this.venueListingService.get_venue_details(input).subscribe(data => {
        if (data['venues'] !== undefined && data['venues'].length > 0) {
	  this.isErrorVisible = false;
          this.errorMessage = '';
          if (data['venues'].length > 21) {
            this.showMore = true;
          }
          if (this.oldFilterData) {
            this.newFilterData = true;
            this.oldFilterData = false;
          } else {
            this.newFilterData = false;
            this.oldFilterData = true;
          }
          this.venues_list = data['venues'];
        } else {
	  this.isErrorVisible = true;
          this.errorMessage = this.venueErrorMessage.NO_VENUES_FOUND;
          this.venues_list = [];
          this.showMore = false;
        }
        this.isExplore = false;
      
      });
    }
  }
}
