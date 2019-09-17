import { Component, OnInit, ViewEncapsulation, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION } from '../../shared/constants/AnalyticsConstants';
import { ReviewsService } from '../../component/add-review/reviews.service';
import { EventConstants, EventErrorMessage } from '../../shared/constants/EventConstants';
import { ErrorMessage } from '../../shared/constants/CommonConstants';
import { EventListingService } from './event-listing.service';
import { AuthService } from '@shared/service/auth.service';
import { Observable } from 'rxjs';
import { User } from '@shared/model/user';
import { MatDialogRef, MatDialog, } from "@angular/material";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '@shared/constants/UrlConstants';
import { VenueListingService } from '../../venue/venue-listing/venue-listing.service';



declare let ga: any;
@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.css']
})
export class EventListingComponent implements OnInit {
  all: string;
  kid_id: any;
  tags: string;
  @ViewChild('openModal') openModal: TemplateRef<any>

  dialogRef: any;
  public all_data;
  isToday = false;
  isExplore = false;
  isTomorrow = false;
  isWeekend = false;
  isTodaylen: Number = 0;
  isExplorelen: Number = 0;
  isTomorrowlen: Number = 0;
  isWeekendlen: Number = 0;
  oldFilterData = true;
  newFilterData = false;
  start = 0;
  end = 21;
  showMore = false;
  showLayout = false;
  dateFilter: any = [{
    id: 1,
    desc: 'today'
  },
  {
    id: 1,
    desc: 'tomorrow'
  },
  {
    id: 1,
    desc: 'weekend'
  },
  {
    id: 1,
    desc: 'next week'
  }];

  /*
  Filter Variables
*/
  public selected_cat: String;
  public select_cat_id: any;
  public selected_loc: String;
  public selected_date: String;
  public distance: String;
  public keyword: String;
  public cat_label: String;
  public loc_label: String;
  public date_label: String;
  public isErrorVisible: Boolean;
  public isFilterErrorVisible: Boolean;
  public errorMessage: String;
  public filterErrorMessage: String;
  public search_query: String;
  public username: String;
  public isAuthenticated$: Observable<boolean>;
  isLogedin = false;
  public isCalendarView: boolean;

  public eventConstatnts = new EventConstants();
  public eventErrorMessage = new EventErrorMessage();
  public commonErrorMessage = new ErrorMessage();
  public categoryList = this.eventConstatnts.PRIMARY_CATEGORY;
  public locations = this.eventConstatnts.LOCATIONS;
  public user: User;
  count = 0;
  moreEvent = 'more events';
  currentUrl: string;
  public searchDate = null;

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    private reviewService: ReviewsService,
    private eventListingService: EventListingService,
    private authService: AuthService,
    private http: HttpClient,
    public dialog: MatDialog,
    private venueListingService: VenueListingService
    
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        this.currentUrl= event.urlAfterRedirects;

        ga('send', 'pageview');
      }
    });

    this.selected_cat = '';
    this.selected_loc = '';
    this.keyword = '';
    this.cat_label = 'Category';
    this.loc_label = 'Location';
    this.date_label = 'Date';
    this.select_cat_id = '';
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  ngOnInit() {
    this.titleService.setTitle('Family friendly events around SF bay area');
    this.metaService.addTag({ name: 'description', content: 'Family friendly events around SF bay area' });
    this.metaService.addTag({ name: 'keywords', content: 'Family friendly events, kids events, SF bay area kids events' });

    // OG meta properties
    this.metaService.addTag({ property: 'og:title', content: 'Family friendly events around SF bay area' });
    this.metaService.addTag({ property: 'og:image', content: 'https://kinparenting.com/assets/kin_logo.jpeg' });
    this.metaService.addTag({ property: 'og:url', content: 'https://kinparenting.com/family-friendly-events-near-me' });
    this.metaService.addTag({ property: 'og:site_name', content: 'Kin Parenting' });

    this.isCalendarView = false;
    this.isErrorVisible = false;
    this.isFilterErrorVisible = false;
    this.errorMessage = '';
    this.selected_cat = this.eventConstatnts.get_cat_name_by_id(this.route.snapshot.queryParams['category']);
    this.keyword = this.route.snapshot.queryParams['q'];
   
    this.selected_loc = this.route.snapshot.queryParams['location'];
    this.selected_date = this.route.snapshot.queryParams['date'];
    this.distance = this.route.snapshot.queryParams['distance'];
    this.username = this.route.snapshot.queryParams['username'];
    this.get_explore_event_details();
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.isAuthenticated$.subscribe(data => {
      this.isLogedin = data;
    })
  }
  onLocationChange(loc_obj: object) {
    this.selected_loc = loc_obj['name'];
    this.loc_label = this.selected_loc;
  }
  onCategoryChange(cat_obj: object) {
    this.selected_cat = cat_obj['name'];
    this.select_cat_id = cat_obj['id'];
    this.cat_label = this.selected_cat;
  }
  onDateChange(date_obj: object) {
    this.selected_date = date_obj['desc'];
    this.date_label = this.selected_date;
  }

  loadMore() {
    if (this.isExplorelen > this.end) {
      this.end = this.end + 21;
    }
    if (this.isExplorelen < this.end) {
      this.showMore = false;
    }

  }
  get_explore_event_details() {
    this.showMore = false;
    this.isExplore = true;
    const d = Date.now();
    // const url = 'https://kin-api-dev.kinparenting.com/events/?event_date_start='
    //   + this.datePipe.transform(d, 'yyyy-MM-dd') + '&event_date_range=30&limit=113';
    // const url='http://ec2-54-215-142-151.us-west-1.compute.amazonaws.com/events/?event_date_start=2019-08-22&limit=90'
    // const url = 'http://ec2-54-215-142-151.us-west-1.compute.amazonaws.com/events/?event_date_start='
    // + this.datePipe.transform(d, 'yyyy-MM-dd') + '&event_date_range=30&limit=113';
    const input = {
      'category': this.select_cat_id === undefined ? '' : this.select_cat_id,
      'q': this.keyword === undefined ? '' : this.keyword.trim(),
      'city': this.selected_loc === undefined ? '' : this.selected_loc,
      'event_range_str': this.selected_date === undefined ? '' : this.selected_date,
      'distance': this.distance === undefined ? '' : this.distance,
      'username': this.username === undefined ? '' : this.username
    };
    // const url = API_URL + 'events/?limit=90';
    // const headers = new HttpHeaders();
    // this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
    //   console.log(data);
    //   data = data.replace(/\n/g, '');
    //   data = JSON.parse(data);
      this.eventListingService.get_event_details(input).subscribe(data => {        
      this.all_data = data['events'];
      this.showMore = false;
      this.isExplorelen = this.all_data.length;
      if (this.isExplorelen > this.end) {
        this.showMore = true;
      }
      this.isExplore = false;
    }, err => {
      console.log(err);
    });

  }

  sortBy(type,kid){
    if(type == 'subscribed'){
      this.distance = null;
      this.kid_id= null;
      this.tags= null;
      this.all = null;
      this.subscribeVenue();
    }
    if(type == 'nearby'){
      this.distance = "20";
      this.kid_id= null;
      this.tags= null;
      this.all = null;
      this.filter_event_data();
    }
    if(type == 'trending'){
      this.distance = null;
      this.kid_id= null;
      this.tags='popular';
      this.all = null;
      this.filter_event_data();
    }
    if(type == 'all'){
      this.distance = null;
      this.kid_id= null;
      this.tags=null;
      this.all = 'yes';
      this.filter_event_data();
    }
    if(kid == 'kid'){
      this.kid_id= type;
      this.distance = null;
      this.tags= null;
      this.all = null;
      this.filter_event_data();
    }
  }

  clear_filter_data() {
    this.selected_cat = '';
    this.selected_loc = '';
    this.selected_date = '';
    this.loc_label = 'None';
    this.cat_label = 'None';
    this.date_label = 'None';
    this.keyword = '';
    this.isFilterErrorVisible = false;
    this.isErrorVisible = false;
    this.errorMessage = '';
    this.filterErrorMessage = '';
    window.location.reload();
  }


  filter_event_data() {
      // if ((this.selected_cat === undefined || this.selected_cat === '') && (this.keyword === undefined || this.keyword === '')
      //   && (this.selected_loc === undefined || this.selected_loc === '')
      //   && (this.selected_date === undefined || this.selected_date === '')) {
      //   this.isFilterErrorVisible = true;
      //   this.isErrorVisible = false;
      //   this.errorMessage = '';
      //   this.filterErrorMessage = this.commonErrorMessage.SELECT_FILTER_CRITERIA;
      //   console.log("in")
      // } else {
      this.isFilterErrorVisible = false;
      this.filterErrorMessage = '';
      const input = {
        'category': this.select_cat_id === undefined ? '' : this.select_cat_id,
        'q': this.keyword === undefined ? '' : this.keyword.trim(),
        'city': this.selected_loc === undefined ? '' : this.selected_loc,
        'event_range_str': this.selected_date === undefined ? '' : this.selected_date,
        'distance': this.distance === undefined ? '' : this.distance,
        'username': this.username === undefined ? '' : this.username,
        'tags': this.tags === undefined ? '' : this.tags,
        'kid_id': this.kid_id === undefined ? '' : this.kid_id,
        'all': this.all === undefined ? '' : this.all,

      };
      if(input.tags === undefined || input.tags === ''){
        delete input.tags;
      }
      if(input.kid_id === undefined || input.kid_id === ''){
        delete input.kid_id;
      }
      if(input.distance === undefined || input.distance === ''){
        delete input.distance;
      }
      if(input.all === undefined || input.all === ''){
        delete input.all;
      }
      this.isExplore = true;
      this.end = 21;
      this.eventListingService.get_event_details(input).subscribe(data => {
        if (data['events'] !== undefined && data['events'].length > 0) {
          this.isErrorVisible = false;
          this.errorMessage = '';
          this.all_data = [];
          this.all_data = data['events'];
          this.showMore = data['events'].length > this.end;
          if (this.oldFilterData) {
            this.newFilterData = true;
            this.oldFilterData = false;
          } else {
            this.newFilterData = false;
            this.oldFilterData = true;
          }
          this.isExplorelen = this.all_data.length;
          this.isExplore = false;

        } else {
          this.isErrorVisible = true;
          this.errorMessage = this.eventErrorMessage.NO_EVENTS_FOUND;
          this.all_data = [];
          this.showMore = false;
          this.isExplore = false;
        }
      }, error => {
        this.all_data = [];
        this.showMore = false;
        this.isExplore = false;
      });
    // }
  }

  add_analytics_data() {
    const final_data = {
      'input_data': []
    };
    const input_final_data = [];
    for (let i = 0; i < this.all_data.length; i++) {
      const final_key_value_pair = {
        'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.EVENT,
        'entity_id': undefined,
        'interface': INTERFACE_ENUM.FE,
        'action': ACTION.VIEW,
        'referrer': '/root/home'
      };
      final_key_value_pair['entity_id'] = this.all_data[i].id;
      input_final_data.push(final_key_value_pair);
    }
    final_data['input_data'] = input_final_data;
    this.reviewService.add_analytics_actions(final_data).subscribe(data => {
    }, error => {
      alert('Something went wrong');
    });

  }

  kin_redirect() {
    ga('send', 'event', {
      eventCategory: 'Clicks',
      eventLabel: 'Kin Redirect',
      eventAction: 'Click on kin redirect button'
    });
    window.location.href = 'http://m.me/kinparenting';
  }

  get_cat_name_by_id(id) {
    let cat_name = '';
    if (id) {
      for (let cat_arr_count = 0; cat_arr_count < this.categoryList.length; cat_arr_count++) {
        const current_cat = this.categoryList[cat_arr_count];
        const current_cat_id = current_cat.id;
        const name = current_cat.name;
        if (current_cat_id == parseInt(id)) {
          cat_name = name;
          break;
        }
      }
    }
    return cat_name;
  }
  //this function will open a popup when user is not loggen in
  checkLogin(linkName) {
    if (this.isLogedin) {
      this.loadMore();
    } else {
      this.detectClick(linkName);
    }
  }
  detectClick(moreEvent) {
    let counter = this.count++
    if(counter <= 1){
      this.loadMore();
    }else{
      this.openPopup(moreEvent);
    }
      
      
      
  }
  openPopup(moreEvent) {
    this.moreEvent = moreEvent;
    this.dialogRef = this.dialog.open(this.openModal, {
      width: "626px"
    });
  }
  signin() {
    sessionStorage.setItem('current_url', JSON.stringify(this.currentUrl))
    this.authService.login();
  }
  closeDialog() {
    this.dialogRef.close();
  }

  subscribeVenue(){
      this.venueListingService.get_subscribed_Venues().subscribe(data => {
      
        if (data && data['venues'].length>0) {
        this.get_subscribe_listing();
        }else{
          this.isErrorVisible = true;
          this.errorMessage = this.eventErrorMessage.NO_SUBSCRIPTION_FOUND;
          this.all_data = [];
          this.showMore = false;
          this.isExplore = false;
        }
      }, error => {
        if (error.status == 400 || error.status == 404) {
          this.isErrorVisible = true;
          this.errorMessage = this.eventErrorMessage.NO_SUBSCRIPTION_FOUND;
          this.all_data = [];
          this.showMore = false;
          this.isExplore = false;
        } else {
          this.isErrorVisible = true;
          this.errorMessage = this.eventErrorMessage.NO_SUBSCRIPTION_FOUND;
          this.all_data = [];
          this.showMore = false;
          this.isExplore = false;
        }
      });
    }

    get_subscribe_listing(){
      this.all_data =null;
      this.showMore = false;
      this.isExplore = true;
          this.eventListingService.subscribe_events().subscribe(data => { 
          this.all_data = data['data'];
          this.showMore = false;
          this.isExplorelen = this.all_data.length;
          if (this.isExplorelen > this.end) {
            this.showMore = true;
          }
          this.isExplore = false;
        }, error => {
          if (error.status == 400 || error.status == 404) {
            this.isErrorVisible = true;
            this.errorMessage = this.eventErrorMessage.NO_SUBSCRIPTION_FOUND;
            this.all_data = [];
            this.showMore = false;
            this.isExplore = false;
          } else {
            this.isErrorVisible = true;
            this.errorMessage = this.eventErrorMessage.NO_SUBSCRIPTION_FOUND;
            this.all_data = [];
            this.showMore = false;
            this.isExplore = false;
          }
    })
  }
}
  

