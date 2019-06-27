import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import {ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION} from '../constants/AnalyticsConstants';
import {ReviewsService} from '../add-review/reviews.service';
import {HikingTrailConstants, HikingTrailErrorMessage } from '../constants/HikingTrailConstants';
import { UrlConstants } from '../constants/UrlConstants';
import {ErrorMessage } from '../constants/CommonConstants';
import {HikingTrailsListingService } from './hiking-listing.service';


declare let ga: any;
@Component({
  selector: 'app-hiking-listing',
  templateUrl: './hiking-listing.component.html',
  styleUrls: ['./hiking-listing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HikingTrailsListingComponent implements OnInit {

  public all_data;
  isExplore = false;
  oldFilterData = true;
  newFilterData = false;
  isExplorelen: Number = 0;
  start = 0;
  end = 21;
  showMore: Boolean = false;
  showLayout: boolean = false;
  hiking_explore;
    /*
    Filter Variables
  */
  public selected_loc: String;
  public distance: String;
  public keyword: String;
  public loc_label: String;
  public isErrorVisible: Boolean;
  public isFilterErrorVisible: Boolean;
  public errorMessage: String;
  public filterErrorMessage: String;
  public search_query: String;
  public username: String;

  public uRLConstants = new UrlConstants();
  public hikingConstants = new HikingTrailConstants();
  public hikingErrorMessage = new HikingTrailErrorMessage();
  public commonErrorMessage = new ErrorMessage();
  public locations = this.hikingConstants.LOCATIONS;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private datePipe: DatePipe,
              private router: Router,
              private titleService: Title,
              private metaService: Meta,
              private reviewService: ReviewsService,
              private hikingListingService : HikingTrailsListingService
              ) {
                this.router.events.subscribe(event => {
                  if (event instanceof NavigationEnd) {
                    ga('set', 'page', event.urlAfterRedirects);
                    ga('send', 'pageview');
                  }
                });

                this.selected_loc = '';
                this.keyword = '' ;
                this.loc_label = 'Location';
                
              }

  ngOnInit() {
    this.isErrorVisible = false;
    this.isFilterErrorVisible = false;
    this.errorMessage = '';
    this.keyword = this.route.snapshot.queryParams['q'];
    this.selected_loc = this.route.snapshot.queryParams['location'];
    this.distance = this.route.snapshot.queryParams['distance'];
    this.username = this.route.snapshot.queryParams['username'];
    this.get_hiking_trail_details();

    this.titleService.setTitle('Family friendly hikes around SF bay area');
    this.metaService.addTag({name: 'description', content: 'Family friendly hikes around SF bay area'});
    this.metaService.addTag({name: 'keywords', content: 'Family friendly hikes, kids hikes, SF bay area kids hikes,'
      + 'stroller friendly hikes'});

    // OG meta properties
    this.metaService.addTag({property: 'og:title', content: 'Family friendly hikes around SF bay area'});
    this.metaService.addTag({property: 'og:image', content: 'https://kinparenting.com/assets/kin_logo.jpeg'});
    this.metaService.addTag({property: 'og:url', content: 'https://kinparenting.com/family-friendly-hikes-near-me'});
    this.metaService.addTag({property: 'og:site_name', content: 'Kin Parenting'});
  }


  onLocationChange(loc_obj : object){
    this.selected_loc = loc_obj['name'];
    this.loc_label = this.selected_loc;
  }
  
  loadMore() {
    if (this.hiking_explore.length > this.end) {
      this.end = this.end + 20;
    }
    if (this.hiking_explore.length < this.end) {
      this.showMore = false;
    }
  }


  get_hiking_trail_details() {
    let url = this.uRLConstants.API_URL + 'hiking-trails/?limit=43';
    this.hiking_explore = '';
    this.isExplore = true;
    this.showMore = false;
    const headers = new HttpHeaders()
    this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
      data = data.replace(/\n/g, '');
      data = JSON.parse(data);
      if (data['trails'] != undefined && data['trails'].length>0) { 
        this.hiking_explore = data['trails'];
      } else {
        alert('No data found');
        this.hiking_explore = [];
      }
      this.isExplore = false;
      if (this.hiking_explore.length > this.end) {
        this.showMore = true;
      }
    });
  }

  add_analytics_data() {
    const final_data = {
      'input_data': []
    };
    const input_final_data = [];
    for (let i = 0; i < this.hiking_explore.length; i++) {
      const final_key_value_pair = {
        'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.HIKING_TRAIL,
        'entity_id': undefined,
        'interface': INTERFACE_ENUM.FE,
        'action': ACTION.VIEW,
        'referrer': '/root/home'
      };
      final_key_value_pair['entity_id'] = this.hiking_explore[i].id;
      input_final_data.push(final_key_value_pair);
    }
    final_data['input_data'] = input_final_data;
    this.reviewService.add_analytics_actions(final_data).subscribe(data => {
    }, error => {
      alert('Something went wrong');
    });

  }
  
  kin_redirect() {
    ga('send', 'camp', {
      eventCategory: 'Clicks',
      eventLabel: 'Kin Redirect',
      eventAction: 'Click on kin redirect button'
    });
    window.location.href = 'http://m.me/kinparenting';
  }


  clear_filter_data() {
        this.keyword = '';
        this.isFilterErrorVisible = false;
        this.isErrorVisible = false;
        this.errorMessage = '';
        this.filterErrorMessage = '';
  }


  filter_hiking_data() {
    if ((this.keyword === undefined || this.keyword === '') && this.selected_loc === '') {
      this.isFilterErrorVisible = true;
      this.isErrorVisible = false;
      this.errorMessage = '';
      this.filterErrorMessage = this.commonErrorMessage.SELECT_FILTER_CRITERIA;
    } else {
      this.isFilterErrorVisible = false;
      this.filterErrorMessage = '';
      let url = '';
      if (this.keyword !== undefined) {
        url = this.uRLConstants.API_URL + 'hiking-trails/?limit=43&q=' + this.keyword.trim();
      } else if(this.selected_loc != undefined) {
         url = this.uRLConstants.API_URL + 'hiking-trails/?limit=43&city=' + this.selected_loc.trim() + ',CA';
      } else {
        url = this.uRLConstants.API_URL + 'hiking-trails/?limit=43';
      }
      this.hiking_explore = [];
      this.showMore = false;
      this.end = 21;
      const headers = new HttpHeaders();
      this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
        data = data.replace(/\n/g, '');
        data = JSON.parse(data);
        this.hiking_explore = data['trails'];
        if (data['trails'] !== undefined && data['trails'].length > 0) {
          this.isErrorVisible = false;
          this.errorMessage = '';
          this.showMore = data['trails'].length > this.end;
          if (this.oldFilterData) {
            this.newFilterData = true;
            this.oldFilterData = false;
          } else {
            this.newFilterData = false;
            this.oldFilterData = true;
          }
        } else {
          this.isErrorVisible = true;
          this.errorMessage = this.hikingErrorMessage.NO_HIKING_TRAILS_FOUND;
          this.showMore = false;
          this.hiking_explore = [];
        }
        this.isExplore = false;
        if (this.hiking_explore.length > this.end) {
          this.showMore = true;
        }
      }, error => {
        this.showMore = false;
        this.isErrorVisible = true;
        this.errorMessage = this.commonErrorMessage.SOMETHING_WENT_WRONG;
      });
    }
  }

  
}
