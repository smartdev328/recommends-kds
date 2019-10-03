import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from '../add-review/reviews.service';
import { API_URL } from '@shared/constants/UrlConstants';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/service/auth.service';

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
        private titleService: Title, private reviewService: ReviewsService,
        private authService: AuthService) {
            this.isAuthenticated$ = this.authService.isAuthenticated$;
            this.isAuthenticated$.subscribe(data => {
              this.isLogedin = data;
            })
        // this.popular = [];
        // this.favorite = [];
        // this.events_weekend = []
        // this.closest_event = []
        // this.is_closest = false;

    }

    ngOnInit() {
        if(this.isLogedin == false){
             this.authService.login();
          }
        this.all_events = {
            'popular': [],
            'weekend': [],
            'closest': [],
            'favourite': [],
        };
        this.titleService.setTitle('MY KIN');
        this.parent_id = this.route.snapshot.queryParams['parent_id'];
        this.get_event_details();
    }

    get_event_details() {
        let url = '';
        // url = API_URL + 'subscribed-events/?parent_id=' + this.parent_id;
        const headers = new HttpHeaders()
            .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk');
        // this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
        //    data = data.replace(/\n/g, '');
        //    data = JSON.parse(data);
        //    this.favorite = data['data'];
        //    this.favorite = this.favorite.slice(0, 3);
        //    this.all_events.favourite.push(this.favorite);
        // if (this.favorite.length > 0) {
        //     this.isFav = true;
        // }
        // });
        url = API_URL + 'events/?tags=popular&limit=3';
        this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
            data = data.replace(/\n/g, '');
            data = JSON.parse(data);
            this.popular = data['events'];
            this.popular = this.popular.slice(0, 3);
            this.all_events.popular.push(this.popular);

            // if (this.popular.length > 0) {
            //     this.isPopular = true;

            // }
        });

        const order_by = 'date_dist_asc';
        url = API_URL + 'events/?username=' +
            this.parent_id + "&order_by=" + order_by + "&distance=20&limit=3";
        this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
            data = data.replace(/\n/g, '');
            data = JSON.parse(data);
            this.closest_event = data['events'];
            this.closest_event = this.closest_event.slice(0, 3);
            this.all_events.closest.push(this.closest_event);

            // if (this.closest_event.length > 0) {
            //     this.is_closest = true;
            // }

        });


        url = API_URL + 'events/?event_range_str=weekend&limit=3';
        this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
            data = data.replace(/\n/g, '');
            data = JSON.parse(data);
            this.events_weekend = data['events'];
            this.events_weekend = this.events_weekend.slice(0, 3);
            this.all_events.weekend.push(this.events_weekend);
            

        });

       
    }

}
