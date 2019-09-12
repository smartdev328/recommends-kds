import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION } from '../../shared/constants/AnalyticsConstants';
import { EventConstants } from '../../shared/constants/EventConstants';
import { VenueConstants, VenueErrorMessage } from '../../shared/constants/VenueConstants';
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

  venueSubscription(){
  // Subscription code here
  }

  get_venue_details() {
    this.venueListingService.get_Saved_Venues().subscribe(data => {
      console.log(data);
        this.venues_list = data['venues'];
        if (this.venues_list.length > this.end) {
          this.showMore = true;
        }
        this.isExplore = false;
      });
  }

//   get_subscribed_venues() {
//     const url =  API_URL + 'subscribe-venue/';
//     const headers = new HttpHeaders()
//       .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk');
//     this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
//       data = data.replace(/\n/g, "");
//       data = JSON.parse(data);
//       if (data['status']) {
//         this.rows = data['data'];
//       } else {
//         this.isErrorVisible = true;
//         this.errorMessage = data['msg'];
//       }
//     }, error => {
//       if (error.status == 400 || error.status == 404) {
//         alert(error.error.msg);
//       } else {
//         alert('Something went wrong');
//       }
//     });

//  }

}
