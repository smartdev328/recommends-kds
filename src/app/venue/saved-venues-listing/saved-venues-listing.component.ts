import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION } from '../../shared/constants/AnalyticsConstants';
import { ReviewsService } from '../../component/add-review/reviews.service';
import { EventConstants } from '../../shared/constants/EventConstants';
import { VenueConstants, VenueErrorMessage } from '../../shared/constants/VenueConstants';
import { ErrorMessage } from '../../shared/constants/CommonConstants';
import { VenueListingService } from '../../venue/venue-listing/venue-listing.service';
import { API_URL } from '@shared/constants/UrlConstants';
import { MatDialogRef, MatDialog, } from "@angular/material";
import { Observable } from 'rxjs';
import { AuthService } from '@shared/service/auth.service';
import { NgForm } from '@angular/forms';

declare let ga: any;
@Component({
  selector: 'app-venue-listing',
  templateUrl: './saved-venues-listing.component.html',
  styleUrls: ['./saved-venues-listing.component.css']
})
export class SavedVenuesListingComponent implements OnInit {
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
  public categoryList = this.venueConstants.PRIMARY_CATEGORY;
  count = 0;
  morePlace = 'more Places';
  public isAuthenticated$: Observable<boolean>;
  isLogedin = false;
  /*
    Filter Variables
  */
  public selected_cat: string;
  public selected_loc: String;
  public keyword: String;
  public cat_label: String;
  public loc_label: String;
  currentUrl: string;
  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    private reviewService: ReviewsService,
    private venueListingService: VenueListingService,
    private authService: AuthService,
    public dialog: MatDialog,
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
    this.isAuthenticated$ = this.authService.isAuthenticated$;

  }

  ngOnInit() {
    this.isErrorVisible = false;
    this.errorMessage = '';
    this.isFilterErrorVisible = false;
    this.filterErrorMessage = '';
    this.category = this.route.snapshot.queryParams['category'];
    this.keyword = this.route.snapshot.queryParams['q'];
    this.get_venue_details();

    this.titleService.setTitle('Family friendly places around SF bay area');
    this.metaService.addTag({ name: 'description', content: 'Family friendly places around SF bay area' });
    this.metaService.addTag({
      name: 'keywords', content: 'Family friendly places, kids places, SF bay area kids places,'
        + 'indoor play, kids birthday party venues'
    });

    // OG meta properties
    this.metaService.addTag({ property: 'og:title', content: 'Family friendly places around SF bay area' });
    this.metaService.addTag({ property: 'og:image', content: 'https://kinparenting.com/assets/kin_logo.jpeg' });
    this.metaService.addTag({ property: 'og:url', content: 'https://kinparenting.com/family-friendly-places-near-me' });
    this.metaService.addTag({ property: 'og:site_name', content: 'Kin Parenting' });

    this.isAuthenticated$.subscribe(data => {
      this.isLogedin = data;
    })
  
  }
  onSubmit(f: NgForm) {
  
  }
  get_venue_details() {
    // if (this.venues_list) {
    //   this.isExplore = true;
    // } else {
    //   let url = '';
    //   if (this.keyword !== '' && this.keyword !== undefined) {
    //     url = API_URL + 'venues/?q=' + this.keyword.trim();
    //   } else if (this.category === undefined || this.category === '') {
    //     url = API_URL + 'venues/?limit=100';
    //   } else {
    //     url = API_URL + 'venues/?categories=' + this.category;
    //   }
      this.venueListingService.get_Saved_Venues().subscribe(data => {
          // data = data.replace(/\n/g, '');
          // data = JSON.parse(data);
          this.venues_list = data['venues'];
          if (this.venues_list.length > this.end) {
            this.showMore = true;
          }
          // this.add_analytics_data();
          this.isExplore = false;
        });
    }
  }



