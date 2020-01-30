import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION } from '../../shared/constants/AnalyticsConstants';
import { ReviewsService } from '../../component/add-review/reviews.service';
import { EventConstants } from '../../shared/constants/EventConstants';
import { VenueConstants, VenueErrorMessage } from '../../shared/constants/VenueConstants';
import { ErrorMessage } from '../../shared/constants/CommonConstants';
import { ClassListingService } from './class-listing.service';
import { API_URL } from '@shared/constants/UrlConstants';
import { MatDialogRef, MatDialog, } from "@angular/material";
import { Observable } from 'rxjs';
import { AuthService } from '@shared/service/auth.service';
import { NgForm } from '@angular/forms';


declare let ga: any;
@Component({
  selector: 'app-class-listing',
  templateUrl: './class-listing.component.html',
  styleUrls: ['./class-listing.component.css']
})
export class ClassListingComponent implements OnInit {
  @ViewChild('openModal') openModal: TemplateRef<any>

  dialogRef: any;
  venues_list;
  isExplore = false;
  public category: string;
  public locations: any;
  showMore = false;
  start = 0;
  end = 20;
  oldFilterData = true;
  newFilterData = false;
  public isErrorVisible: boolean;
  public isFilterErrorVisible: boolean;
  public errorMessage: String;
  public filterErrorMessage: String;
  public eventConstatnts = new EventConstants();
  public venueConstants = new VenueConstants();
  public commonErrorMessage = new ErrorMessage();
  public venueErrorMessage = new VenueErrorMessage();
  public categoryList = this.venueConstants.CLASSES_CATEGORIES;
  count = 0;
  moreClasses = 'more classes';
  public isAuthenticated$: Observable<boolean>;
  isLogedin = false;
  /*
    Filter Variables
  */
  public selected_cat: string;
  public selected_loc: String;
  public keyword: String;
  public city: String;
  public cat_label: String;
  public loc_label: String;
  currentUrl: string;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    private reviewService: ReviewsService,
    private classListingService: ClassListingService,
    private authService: AuthService,
    public dialog: MatDialog,
    private http: HttpClient
  ) {
    /*
      Filter Variables
    */
    this.selected_cat = '';
    this.selected_loc = '';
    this.keyword = '';
    this.cat_label = 'Category';
    this.loc_label = 'Location';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        this.currentUrl= event.urlAfterRedirects;
        ga('send', 'pageview');
      }
    });
    this.locations = this.venueConstants.LOCATIONS;


  }

  ngOnInit() {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.isAuthenticated$.subscribe(data => {
      this.isLogedin = data;
      this.authService.setAuth(this.isLogedin);
      this.get_venue_details();
    })
    this.isErrorVisible = false;
    this.errorMessage = '';
    this.isFilterErrorVisible = false;
    this.filterErrorMessage = '';
    this.category = this.route.snapshot.queryParams['category'];
    this.keyword = this.route.snapshot.queryParams['q'];
    this.city = this.route.snapshot.queryParams['city'];

    this.titleService.setTitle('Classes for kids around SF bay area');
    this.metaService.addTag({ name: 'description', content: 'Classes for kids around SF bay area' });
    this.metaService.addTag({
      name: 'keywords', content: 'Piano class, music class, arts class, dance class, gymnastics class,'
        + 'soccer class'
    });

    // OG meta properties
    this.metaService.addTag({ property: 'og:title', content: 'Classes for kids around SF bay area' });
    this.metaService.addTag({ property: 'og:image', content: 'https://kinparenting.com/assets/web_images/kinNest120.jpg' });
    this.metaService.addTag({ property: 'og:url', content: 'https://kinparenting.com/family-friendly-places-near-me' });
    this.metaService.addTag({ property: 'og:site_name', content: 'Kin Parenting' });

    //this.getLocation();
  
  }
  onSubmit(f: NgForm) {
  }


  get_venue_details() {
      let limit = '100';
      if (!this.isLogedin) {
        limit = '25';
      }
      let url = API_URL + 'venues/?category=Classes&limit=' + limit;
      
      if (this.keyword !== '' && this.keyword !== undefined) {
        url = url + '&q=' + this.keyword.trim();
      } 
      if (this.category !== undefined && this.category !== '') {
        url = url + '&category_sec=' + encodeURIComponent(this.category);
      }
      if (this.city !== undefined && this.city !== '') {
        url = url + '&city=' + this.city.trim();
      }
      this.isExplore = true;
      if(this.isLogedin == true){
        url = url +'&distance=100&order_by=dist_asc';
      }
      this.classListingService.get_venue_details(url, this.http, this.isLogedin).subscribe(data => {
          this.venues_list = data['venues'];
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
  
  
  loadMore() {
    if (this.venues_list.length > this.end) {
      this.end = this.end + 20;
    }
    if (this.venues_list.length < this.end) {
      this.showMore = false;
    }

  }

  add_analytics_data(action_type) {
    const final_data = {
      'input_data': []
    };
    const input_final_data = [];
      const final_key_value_pair = {
        'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.Class,
        'entity_id': 0,
        'interface': INTERFACE_ENUM.FE,
        'action': action_type,
        'referrer': '/root/home' };
    input_final_data.push(final_key_value_pair);
    final_data['input_data'] = input_final_data;
    if (!this.isLogedin) {
      this.http.post(API_URL + 'actions/' , final_data).subscribe(data => {
      });
    } else {
      this.reviewService.add_analytics_actions(final_data).subscribe(data => {
      }, error => {
    });
   }
  }

  kin_redirect() {
    ga('send', 'venue', {
      eventCategory: 'Clicks',
      eventLabel: 'Kin Redirect',
      eventAction: 'Click on kin redirect button'
    });
    window.location.href = 'http://m.me/kinparenting';
  }

  onLocationChange(loc_obj: object) {
    this.selected_loc = loc_obj['name'];
    this.loc_label = this.selected_loc;
    this.filter_venue_data();
  }
  onCategoryChange(cat_obj: object) {
    this.selected_cat = cat_obj['name'];
    this.cat_label = this.selected_cat;
    this.filter_venue_data();
  }

  clear_filter_data() {
    this.selected_cat = '';
    this.selected_loc = '';
    this.cat_label = 'Category';
    this.loc_label = 'Location';
    this.keyword = '';
    this.isFilterErrorVisible = false;
    this.isErrorVisible = false;
    this.errorMessage = '';
    this.filterErrorMessage = '';
    this.ngOnInit();
  }

  getLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          console.log("Got it!")
        });
    } else {
       console.log("No support for geolocation")
    }
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
            let limit = '100';
            if (!this.isLogedin) {
              limit = '25';
            }
            let url = API_URL + 'venues/?category=Classes&limit=' + limit;
            if (this.keyword) {
                url = url + '&q=' + this.keyword.trim();
            } if (this.selected_loc) {
                url = url + '&city=' + this.selected_loc.trim();
            } if (this.selected_cat) {
                url = url + '&category_sec=' + encodeURIComponent(this.selected_cat.trim());
            }
            this.showMore = false;
            this.isExplore = true;
            if (this.isLogedin == true) {
                url = url + '&distance=100&order_by=dist_asc';
            }
            this.classListingService.get_venue_details(url, this.http, this.isLogedin).subscribe(data => {
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

   //this function will open a popup when user is not loggen in
   checkLogin(linkName) {
    if (this.isLogedin) {
      this.loadMore();
    } else {
      this.add_analytics_data(ACTION.MORE);
      this.detectClick(linkName);
    }
  }
  detectClick(morePlace) {
    // let counter = this.count++
    // if(counter <= 1){
    //   this.loadMore();
    // }else
      this.openPopup(morePlace);
  }
  openPopup(moreClasses) {
    this.moreClasses = moreClasses;
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
}


