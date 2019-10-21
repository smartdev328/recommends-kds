import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from '../add-review/reviews.service';
import { API_URL } from '@shared/constants/UrlConstants';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/service/auth.service';
import { EventListingService } from '../../event/event-listing/event-listing.service';

@Component({
    selector: 'app-personalized',
    templateUrl: './personalized.component.html',
    styleUrls: ['./personalized.component.css']
})
export class PersonalizedComponent implements OnInit {
    events_explore: any;
    public popular: any = [];
    public favorite: any = [];
    public events_weekend: any = [];
    public closest_event: any = [];
    isPopular: Boolean = true;
    isFav: Boolean = true;
    isWeekend: Boolean = true;
    public is_closest: Boolean = true;
    public category: string;
    parent_id: Number;
    start = 0;
    end = 21;
    showMore: Boolean = true;
    showLayout = true;
    public all_events: any;
    isAuthenticated$: Observable<boolean>;
    currentUrl: string;
    isLogedin:boolean;

    constructor(private route: ActivatedRoute,
        private http: HttpClient,
        private datePipe: DatePipe,
        private router: Router,
        private eventListingService : EventListingService,
        private titleService: Title, private reviewService: ReviewsService,
        private authService: AuthService) {
            this.isAuthenticated$ = this.authService.isAuthenticated$;
            this.isAuthenticated$.subscribe(data => {
              this.isLogedin = data;
            })
    }

    ngOnInit() {
        this.all_events = {
            'popular': [],
            'weekend': [],
            'closest': [],
            'favourite': [],
        };
        this.isAuthenticated$.subscribe(data => {
            this.isLogedin = data;
            this.authService.setAuth(this.isLogedin);
            this.get_event_details();
          })
        if(this.isLogedin == false){
             this.authService.login();
          }
        this.titleService.setTitle('MY KIN');
        this.parent_id = this.route.snapshot.queryParams['parent_id'];
    }

    get_event_details() {
        let url = API_URL + 'events/?tags=popular&distance=100&order_by=date_dist_asc';
            this.eventListingService.get_event_details(url).subscribe(data => {
            this.popular = data['events'];
            this.popular = this.popular;
            this.all_events.popular.push(this.popular);
        });
        let urlNearby  = API_URL + 'events/?order_by=date_dist_asc&distance=10';
            this.eventListingService.get_event_details(urlNearby).subscribe(data => {
            this.closest_event = data['events'];
            this.closest_event = this.closest_event;
            this.all_events.closest.push(this.closest_event);
        });
        let urlWeekend = API_URL + 'events/?event_range_str=weekend?order_by=date_dist_asc';
        this.eventListingService.get_event_details(urlWeekend).subscribe(data => {
            this.events_weekend = data['events'];
            this.events_weekend = this.events_weekend;
            this.all_events.weekend.push(this.events_weekend);           
        });
    }
}
