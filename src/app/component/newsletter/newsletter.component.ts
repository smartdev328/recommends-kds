import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@shared/service/auth.service';
import { Observable } from 'rxjs';
import { API_URL } from '@shared/constants/UrlConstants';
import { EventConstants, EventErrorMessage } from '../../shared/constants/EventConstants';
import { ErrorMessage } from '../../shared/constants/CommonConstants';
import { EventListingService } from '../../event/event-listing/event-listing.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VenueListingService } from '../../venue/venue-listing/venue-listing.service';
import { VenueErrorMessage } from '@shared/constants/VenueConstants';
import { CampListingService } from '../../camp/camp-listing/camp-listing.service';
import { CampErrorMessage } from '@shared/constants/CampConstants';
import { HikingTrailsListingService } from '../../hiking/hiking-listing/hiking-listing.service';
import { HikingTrailErrorMessage } from '@shared/constants/HikingTrailConstants';


@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  trailList: any;
  campList: any;
  venueList: any;
  errorMessage: string;
  eventList: any;
  limit: any= 5;
  isAuthenticated$: Observable<boolean>;
  currentUrl: string;
  isLogedin:boolean;
  cityName: String;


  public eventErrorMessage = new EventErrorMessage();
  public venueErrorMessage = new VenueErrorMessage();
  public campErrorMessage = new CampErrorMessage();
  public hikeErrorMessage = new HikingTrailErrorMessage();
  public commonErrorMessage = new ErrorMessage();

  constructor(private router : Router,
    private authService: AuthService,
    private eventListingService: EventListingService,
    private venueService: VenueListingService,
    private campService: CampListingService,
    private hikeService: HikingTrailsListingService,
    public http: HttpClient,
    private route: ActivatedRoute,
  ) { 

  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cityName = params['city'];
    });
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.isAuthenticated$.subscribe(data => {
      this.isLogedin = data;
      this.getEvents()
      this.getPlaces();
      this.getCamps();
      this.getTrails();
    })
  }

  getEvents() {
    let url = `${API_URL}` + `events/?limit=${this.limit}&city=${this.cityName}`;
    if (this.isLogedin == true) {
      this.eventListingService.get_event_details(url).subscribe(data => {
        if (data['events'] !== undefined && data['events'].length > 0) {
          this.eventList = data['events'];
        } else {
          this.errorMessage = this.eventErrorMessage.NO_EVENTS_FOUND;
        }
      }, err => {
        console.log(err);
      });
    } else {
      const headers = new HttpHeaders();
      this.http.get(url, { headers: headers, responseType: 'json' }).subscribe(data => {
        if (data['events'] !== undefined && data['events'].length > 0) {
          this.eventList = data['events'];
        } else {
          this.errorMessage = this.eventErrorMessage.NO_EVENTS_FOUND;
        }
      }, err => {
        console.log(err);
      });

    }

  }

  getPlaces() {
    let url = `${API_URL}` + `venues/?limit=${this.limit}&city=${this.cityName}`;
    if (this.isLogedin == true) {
      this.venueService.get_venue_details(url).subscribe(data => {
        if (data['venues'] !== undefined && data['venues'].length > 0) {
          this.venueList = data['venues'];
        } else {
          this.errorMessage = this.venueErrorMessage.NO_VENUES_FOUND;
        }
      }, err => {
        console.log(err);
      });
    } else {
      const headers = new HttpHeaders();
      this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
        data = data.replace(/\n/g, '');
        data = JSON.parse(data);
        if (data['venues'] !== undefined && data['venues'].length > 0) {
          this.venueList = data['venues'];
          console.log(this.venueList)
        } else {
          this.errorMessage = this.venueErrorMessage.NO_VENUES_FOUND;
        }
      }, err => {
        console.log(err);
      });

    }

  }

  getCamps() {
    let url = `${API_URL}` + `camps/?limit=${this.limit}&city=${this.cityName}`;
    if (this.isLogedin == true) {
      this.campService.get_camp_details(url).subscribe(data => {
        if (data['data'] !== undefined && data['data'].length > 0) {
          this.campList = data['data'];
        } else {
          this.errorMessage = this.campErrorMessage.NO_CAMPS_FOUND;
        }
      }, err => {
        console.log(err);
      });
    } else {
      const headers = new HttpHeaders();
      this.http.get(url, { headers: headers, responseType: 'json' }).subscribe(data => {
        if (data['data'] !== undefined && data['data'].length > 0) {
          this.campList = data['data'];
        } else {
          this.errorMessage = this.campErrorMessage.NO_CAMPS_FOUND;
        }
      }, err => {
        console.log(err);
      });

    }

  }

  getTrails() {
    let url = `${API_URL}` + `hiking-trails/?limit=${this.limit}&city=${this.cityName}`;
    if (this.isLogedin == true) {
      this.hikeService.get_hiking_trail_details(url).subscribe(data => {
        if (data['trails'] !== undefined && data['trails'].length > 0) {
          this.trailList = data['trails'];
        } else {
          this.errorMessage = this.campErrorMessage.NO_CAMPS_FOUND;
        }
      }, err => {
        console.log(err);
      });
    } else {
      const headers = new HttpHeaders();
      this.http.get(url, { headers: headers, responseType: 'json' }).subscribe(data => {
        if (data['trails'] !== undefined && data['trails'].length > 0) {
          this.trailList = data['data'];
        } else {
          this.errorMessage = this.hikeErrorMessage.NO_HIKING_TRAILS_FOUND;
        }
      }, err => {
        console.log(err);
      });

    }

  }
}
