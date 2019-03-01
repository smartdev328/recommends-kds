import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { UrlConstants } from '../constants/UrlConstants';
import { ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION } from '../constants/AnalyticsConstants';
import { ReviewsService } from '../add-review/reviews.service';

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
    public URLConstatnts = new UrlConstants();
    parent_id: Number;
    start = 0;
    end = 21;
    showMore: Boolean = true;
    showLayout: boolean = true;
    public all_events: any;

    constructor(private route: ActivatedRoute,
        private http: HttpClient,
        private datePipe: DatePipe,
        private router: Router,
        private titleService: Title, private reviewService: ReviewsService) {
        // this.popular = [];
        // this.favorite = [];
        // this.events_weekend = []
        // this.closest_event = []
        // this.is_closest = false;

    }

    ngOnInit() {
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
        let self = this;
        let url = '';
        url = this.URLConstatnts.API_URL + 'subscribed-events/?parent_id=' + this.parent_id;
        const headers = new HttpHeaders()
            .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk');
        this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
            data = data.replace(/\n/g, '');
            data = JSON.parse(data);
            this.favorite = data['data'];
            this.favorite = this.favorite.slice(0, 3);
            this.all_events.favourite.push(this.favorite);
            // if (this.favorite.length > 0) {
            //     this.isFav = true;
            // }
        });
        url = this.URLConstatnts.API_URL + 'events/?tags=popular&limit=3';
        this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
            data = data.replace(/\n/g, '');
            data = JSON.parse(data);
            this.popular = data['events'];
            this.popular = this.popular.slice(0, 3)
            this.all_events.popular.push(this.popular);

            // if (this.popular.length > 0) {
            //     this.isPopular = true;

            // }
        });

        let order_by = 'date_dist_asc'
        url = this.URLConstatnts.API_URL + 'events/?parent_id=' +
            this.parent_id + "&order_by=" + order_by + "&limit=3";
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


        url = this.URLConstatnts.API_URL + 'events/?event_range_str=weekend&limit=3';
        this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
            data = data.replace(/\n/g, '');
            data = JSON.parse(data);
            this.events_weekend = data['events'];
            this.events_weekend = this.events_weekend.slice(0, 3);
            this.all_events.weekend.push(this.events_weekend);
            // this.closest_event = data['events'];
            // this.closest_event = this.events_weekend;
            // this.popular = this.events_weekend;
            // this.favorite = this.events_weekend;
            // this.closest_event = this.events_weekend;

            // if (this.events_weekend.length > 0) {
            //     this.isWeekend = true;
            //     // this.is_closest = true;
            //     // this.events_weekend = this.events_weekend.slice(0, 4);
            //     // this.popular = this.events_weekend;
            //     // this.favorite = this.events_weekend;
            //     // this.closest_event = this.events_weekend;
            // }

        });

        // console.log(this.popular);
        // console.log(this.events_weekend)
        // console.log(this.closest_event)
        // console.log(this.favorite)
        // this.all_events = {
        //     'popular': this.popular,
        //     'weekend': this.events_weekend,
        //     'closest': this.closest_event,
        //     'favourite': this.favorite,
        // };

    }

}
