import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION } from '../../shared/constants/AnalyticsConstants';
import { EventConstants } from '../../shared/constants/EventConstants';
import { ErrorMessage } from '../../shared/constants/CommonConstants';
import { VenueListingService } from '../../venue/venue-listing/venue-listing.service';
import { API_URL } from '@shared/constants/UrlConstants';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/service/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})

export class SavedComponent implements OnInit {


  subscribe_list: any;
  venues_list;
  isExplore = false;
  showMore = false;
  start = 0;
  end = 20;
  oldFilterData = true;
  newFilterData = false;
  public isErrorVisible: boolean;
  public isFilterErrorVisible: boolean;
  public errorMessage: String;
  public filterErrorMessage: String;

  count = 0;
  morePlace = 'more Places';
  public isAuthenticated$: Observable<boolean>;
  isLogedin = false;
  public parent_id: any;
  public venue_id: any;
  public rows: any;
  public columns: any;
  public selected: any;
  /*
    Filter Variables
  */
  public loc_label: String;
  currentUrl: string;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private venueListingService: VenueListingService,
    private authService: AuthService,
    private http: HttpClient,
  ) {
    /*
      Filter Variables
    */
    this.loc_label = 'Location';
    this.isAuthenticated$ = this.authService.isAuthenticated$;

  }
  ngOnInit() {
    this.isErrorVisible = false;
    this.errorMessage = '';
    this.isFilterErrorVisible = false;
    this.filterErrorMessage = '';
    this.isAuthenticated$.subscribe(data => {
      this.isLogedin = data;
    });

    this.get_venue_details();

  }

  get_venue_details() {
    this.venueListingService.get_subscribed_Venues().subscribe(data => {
      this.subscribe_list = data['venues'];
      this.subscribe_list.forEach((item, index) => {
        this.subscribe_list[index].sub = 0;
    });
      if (this.subscribe_list.length > this.end) {
        this.showMore = true;
      }
      this.isExplore = false;
    }, error => {
      if (error.status == 400 || error.status == 404) {
        console.log("Iferror", error);
      } else {
        console.log("else", error);
      }
    });
  }

}
