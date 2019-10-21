import { Component, OnInit, ViewEncapsulation, TemplateRef, ViewChild, ElementRef } from '@angular/core';
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
import { MatDialogRef, MatDialog, MatDatepicker, MatDatepickerInputEvent, } from "@angular/material";
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
  kidHeading: string;
  limit: Number = 80;
  event_date_start: any;
  pickDate: boolean = false;
  public all: any;
  public kid_id: any;
  public tags: any='';
  @ViewChild('openModal') openModal: TemplateRef<any>
  @ViewChild('picker') datePicker: MatDatepicker<Date>;



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
  },
  {
    id: 1,
    desc: 'this month'
  },
  {
    id: 1,
    desc: 'next month'
  },
  {
    id: 1,
    desc: 'Pick a date'
  }];

  /*
  Filter Variables
*/
  public selected_cat: String;
  public select_cat_id: any;
  public selected_loc: any;
  public selected_date: any;
  public distance: any;
  public keyword: any;
  public cat_label: String;
  public loc_label: String;
  public date_label: any;
  public isErrorVisible: Boolean;
  public isFilterErrorVisible: Boolean;
  public errorMessage: String;
  public filterErrorMessage: String;
  public search_query: String;
  public username: String;
  public isAuthenticated$: Observable<boolean>;
  isLogedin;
  public isCalendarView: boolean;
  public eventName = "All";

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
        this.currentUrl = event.urlAfterRedirects;

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
  }

  ngOnInit() {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.isAuthenticated$.subscribe(data => {
      this.isLogedin = data;
      this.authService.setAuth(this.isLogedin);
      this.get_explore_event_details();
    })
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
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }
  onLocationChange(loc_obj: object) {
    this.eventName ="";
    this.selected_loc = loc_obj['name'];
    this.loc_label = this.selected_loc;
    this.filter_event_data();

  }
  onCategoryChange(cat_obj: object) {
    this.eventName ="";
    this.selected_cat = cat_obj['name'];
    this.select_cat_id = cat_obj['id'];
    this.cat_label = this.selected_cat;
    this.filter_event_data();
  }
  onDateChange(date_obj: object) {
    this.eventName ="";
    if (date_obj['desc'] == 'Pick a date') {
      this.pickDate = true;
      setTimeout(() => {
        this.datePicker.open();
      }, 1000);
    } else {
      this.pickDate = false;
      this.selected_date = date_obj['desc'];
      this.date_label = this.selected_date;
      this.filter_event_data();
    }


  }

  fromDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.selected_date = 1;
    this.date_label = this.formatDate(event.value);
    this.event_date_start = this.formatDate(event.value);

    if (this.event_date_start) {
      this.filter_event_data();
    }
  }

  formatDate(date) {
    if (date == null) {
      let a = "";
      return a
    }
    let a = new Date(date);
    var frommonth = ('0' + (a.getMonth() + 1)).slice(-2)
    let fromday;
    let d = new Date(date);
    if (d.getDate() < 10) {
      fromday = '0' + (a.getDate());
    } else {
      fromday = (a.getDate());
    }
    let fromyear = a.getFullYear();
    let finaldate = fromyear + '-' + frommonth + '-' + fromday;
    return finaldate;
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
    // this.isExplore = true;
    if (this.isLogedin == true) {
      let url = `${API_URL}` + `events/?order_by=date_dist_asc&distance=100&limit=${this.limit}`;
      this.eventListingService.get_event_details(url).subscribe(data => {
        this.all_data = data['events'];
        if (data['events'] !== undefined && data['events'].length > 0) {
          this.isErrorVisible = false;
          this.errorMessage = '';
          this.all_data = [];
          this.all_data = data['events'];
          this.showMore = this.all_data.length > this.end;
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
          this.errorMessage = this.eventErrorMessage.NO_EVENTS_FOUND;
          this.all_data = [];
          this.newFilterData = false;
          this.oldFilterData = false;
          this.showMore = false;
          this.isExplore = false;
          this.isErrorVisible = true;
  
        }
      }, err => {
        console.log(err);
      });
    } else {
      let url = `${API_URL}` + `events/?distance=100&limit=${this.limit}`;
      const headers = new HttpHeaders();
      this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
        data = data.replace(/\n/g, '');
        data = JSON.parse(data);
        this.all_data = data['events'];
        if (data['events'] !== undefined && data['events'].length > 0) {
          this.isErrorVisible = false;
          this.errorMessage = '';
          this.all_data = [];
          this.all_data = data['events'];
          this.showMore = this.all_data.length > this.end;
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
          this.errorMessage = this.eventErrorMessage.NO_EVENTS_FOUND;
          this.all_data = [];
          this.newFilterData = false;
          this.oldFilterData = false;
          this.showMore = false;
          this.isExplore = false;
          this.isErrorVisible = true;
  
        }
      }, err => {
        console.log(err);
      });

    }

  }

  sortBy(type, kid) {
    if (type == 'subscribed') {
      this.kidHeading = "other";
      this.eventName = "Following";
      this.distance = '';
      this.kid_id = '';
      this.tags = '';
      this.all = '';
      this.subscribeVenue();
    }
    else if (type == 'nearby') {
      this.kidHeading = "other";
      this.distance = 10;
      this.kid_id ='';
      this.tags ='';
      this.all ='';
      this.eventName = "Nearby";
      this.filter_event_data();
    }
    else if (type == 'trending') {
      this.kidHeading = "other";
      this.distance = '';
      this.kid_id = '';
      this.tags = 'popular';
      this.all ='';
      this.eventName = "Trending";
      this.filter_event_data();
    }
    else if (type == 'all') {
      this.kidHeading = "";
      this.distance ='';
      this.kid_id ='';
      this.tags ='';
      this.all = 'yes';
      this.eventName = "All";
      this.filter_event_data();
    }
    else {
      this.kidHeading = "kid";
      this.kid_id = type;
      this.distance = null;
      this.tags = null;
      this.all = null;
      this.eventName = kid.nick_name;
      this.filter_event_data();
    }
  }

  clear_filter_data() {
    this.selected_cat = '';
    this.selected_loc = '';
    this.selected_date = '';
    this.event_date_start = '';
    this.cat_label = 'Category';
    this.loc_label = 'Location';
    this.date_label = 'Date';
    this.keyword = '';
    this.isFilterErrorVisible = false;
    this.isErrorVisible = false;
    this.errorMessage = '';
    this.filterErrorMessage = '';
    this.all = '';
    this.kid_id = '';
    this.tags = '';
    this.eventName = "All";
    this.kidHeading = "other";
    this.ngOnInit();
  }


  filter_event_data() {
    this.isFilterErrorVisible = false;
    this.isErrorVisible = false;
    this.filterErrorMessage = '';
    this.errorMessage = '';
    const input = {
      'category': this.select_cat_id === undefined ? '' : this.select_cat_id,
      'q': this.keyword == undefined ? '' : this.keyword,
      'city': this.selected_loc == undefined? '' : this.selected_loc,
      'event_range_str': this.selected_date == undefined? '' : this.selected_date,
      'distance': this.distance === undefined? 50 : this.distance,
      'username': this.username === undefined ? '' : this.username,
      'tags': this.tags === undefined ? '' : this.tags,
      'kid_id': this.kid_id === undefined ? '' : this.kid_id,
      'all': this.all === undefined ? '' : this.all,
      'event_date_start': this.event_date_start == undefined? '' : this.event_date_start,
    };
    if(input.event_range_str == "today" ||input.event_range_str == "tomorrow" ||input.event_range_str == "weekend"){
     input.distance = 25; 
     if(this.eventName == "Nearby"){
      input.distance = 10; 
     }
    }
    if(input.distance == null){
      input.distance ='';
    }
    if(input.kid_id == null){
      input.kid_id ='';
    }
    if(input.tags == null){
      input.tags ='';
    }
    let url;
    if(this.isLogedin){
    url = `${API_URL}` + 'events/?order_by=date_dist_asc&event_date_start='+ input.event_date_start + '&limit=90'+'&category=' + encodeURIComponent(input.category) +'&q=' + encodeURIComponent(input.q) +'&city=' + encodeURIComponent(input.city) +'&event_range_str=' + encodeURIComponent(input.event_range_str)+'&distance=' + encodeURIComponent(input.distance)+'&kid_id=' + encodeURIComponent(input.kid_id)+ '&tags=' + encodeURIComponent(input.tags)
    }if(!this.isLogedin){
      url = `${API_URL}` + 'events/?event_date_start='+ input.event_date_start + '&limit=90'+'&category=' + encodeURIComponent(input.category) +'&q=' + encodeURIComponent(input.q) +'&city=' + encodeURIComponent(input.city) +'&event_range_str=' + encodeURIComponent(input.event_range_str)+'&distance=' + encodeURIComponent(input.distance)+'&kid_id=' + encodeURIComponent(input.kid_id)+ '&tags=' + encodeURIComponent(input.tags)
    }
    if (input.kid_id) {
     url = url+ "&personalize=True";
    }
    if(this.eventName == "All"){
      url = `${API_URL}` + `events/?distance=100&limit=${this.limit}`;
    }
    this.isExplore = true;
    this.end = 21;
    if(this.isLogedin ==true){
      this.eventListingService.get_event_details(url).subscribe(data => {
        if (data['events'] !== undefined && data['events'].length > 0) {
          this.isErrorVisible = false;
          this.errorMessage = '';
          this.all_data = [];
          this.all_data = data['events'];
          this.showMore = this.all_data.length > this.end;
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
          this.errorMessage = this.eventErrorMessage.NO_EVENTS_FOUND;
          this.all_data = [];
          this.newFilterData = false;
          this.oldFilterData = false;
          this.showMore = false;
          this.isExplore = false;
          this.isErrorVisible = true;
  
        }
      }, error => {
        this.all_data = [];
        this.showMore = false;
        this.isExplore = false;
      });

    }else{
      const headers = new HttpHeaders();
      this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
        data = data.replace(/\n/g, '');
        data = JSON.parse(data);
        if (data['events'] !== undefined && data['events'].length > 0) {
          this.isErrorVisible = false;
          this.errorMessage = '';
          this.all_data = [];
          this.all_data = data['events'];
          this.showMore = this.all_data.length > this.end;
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
          this.errorMessage = this.eventErrorMessage.NO_EVENTS_FOUND;
          this.all_data = [];
          this.newFilterData = false;
          this.oldFilterData = false;
          this.showMore = false;
          this.isExplore = false;
          this.isErrorVisible = true;
  
        }
      }, error => {
        this.all_data = [];
        this.showMore = false;
        this.isExplore = false;
      });
    }

    
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
    // let counter = this.count++
    // if (counter <= 1) {
    //   this.loadMore();
    // } else {
      this.openPopup(moreEvent);
    // }



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

  subscribeVenue() {
    this.venueListingService.get_subscribed_Venues().subscribe(data => {

      if (data && data['venues'].length > 0) {
        this.get_subscribe_listing();
      } else {
        this.errorMessage = this.eventErrorMessage.NO_SUBSCRIPTION_FOUND;
        this.all_data = [];
        this.showMore = false;
        this.isExplore = false;
        this.isErrorVisible = true;
      }
    }, error => {
      if (error.status == 400 || error.status == 404) {
        this.errorMessage = this.eventErrorMessage.NO_SUBSCRIPTION_FOUND;
        this.all_data = [];
        this.showMore = false;
        this.isExplore = false;
        this.isErrorVisible = true;

      } else {
        this.errorMessage = this.eventErrorMessage.NO_SUBSCRIPTION_FOUND;
        this.all_data = [];
        this.showMore = false;
        this.isExplore = false;
        this.isErrorVisible = true;

      }
    });
  }

  get_subscribe_listing() {
    this.all_data = null;
    this.showMore = false;
    this.isExplore = true;
    this.eventListingService.subscribe_events().subscribe(data => {
      this.isErrorVisible = false;
      this.errorMessage = '';
      this.all_data = [];
      this.all_data = data['data'];
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
    }, error => {
      if (error.status == 400 || error.status == 404) {
        this.errorMessage = this.eventErrorMessage.NO_SUBSCRIPTION_FOUND;
        this.all_data = [];
        this.showMore = false;
        this.isExplore = false;
        this.isErrorVisible = true;

      } else {
        this.errorMessage = this.eventErrorMessage.NO_SUBSCRIPTION_FOUND;
        this.all_data = [];
        this.showMore = false;
        this.isExplore = false;
        this.isErrorVisible = true;
      }
    })
  }
}


