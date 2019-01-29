import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION} from '../constants/AnalyticsConstants';
import {ReviewsService} from '../add-review/reviews.service';

declare let ga: any;
@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventListingComponent implements OnInit {
  events_explore;
  events_today;
  events_tomorrow;
  events_weekend;
  isToday: boolean = false;
  isExplore: boolean = false;
  isTomorrow: boolean = false;
  isWeekend: boolean = false;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private datePipe: DatePipe,
              private router: Router,
              private titleService: Title, private reviewService: ReviewsService) { 
                this.router.events.subscribe(event => {
                  if (event instanceof NavigationEnd) {
                    ga('set', 'page', event.urlAfterRedirects);
                    ga('send', 'pageview');
                  }
                });
              }

  ngOnInit() {
    this.titleService.setTitle("Events");
    this.get_explore_event_details();
  }

  get_explore_event_details() {
    if(this.events_explore) {
      this.isExplore = true;
    }
    else {
      var d = Date.now();
      let url = "https://kin-api.kinparenting.com/events?event_date_start=" + this.datePipe.transform(d, 'yyyy-MM-dd') + "&event_date_range=30&limit=113"; 
      const headers = new HttpHeaders()
          .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk');
      this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
          data = data.replace(/\n/g, "");
          data = JSON.parse(data);
          this.events_explore = data["events"];
          this.add_analytics_data();
          this.isExplore = true;
      })
    }
  }

  get_today_events() {
    if(this.events_today) {
      this.isToday = true;
    }
    else {
      let url = "https://kin-api.kinparenting.com/events?event_range_str=today"; 
      const headers = new HttpHeaders()
          .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk');
      this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
          data = data.replace(/\n/g, "");
          data = JSON.parse(data);
          this.events_today = data["events"];
          this.isToday = true;
      })
    }
  }

  get_tomorrow_events() {
    if(this.events_tomorrow) {
      this.isTomorrow = true;
    }
    else {
      let url = "https://kin-api.kinparenting.com/events?event_range_str=tomorrow"; 
      const headers = new HttpHeaders()
          .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk');
      this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
          data = data.replace(/\n/g, "");
          data = JSON.parse(data);
          this.events_tomorrow = data["events"];
          this.isTomorrow = true;
      })
    }
  }

  get_weekend_events() {
    if(this.events_weekend) {
      this.isWeekend = true;
    }
    else {
      let url = "https://kin-api.kinparenting.com/events?event_range_str=weekend"; 
      const headers = new HttpHeaders()
          .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk');
      this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
          data = data.replace(/\n/g, "");
          data = JSON.parse(data);
          this.events_weekend = data["events"];
          this.isWeekend = true;
      })
    }
  }

  onTabClick(event) {
    this.isExplore = false;
    this.isToday = false;
    this.isTomorrow = false;
    this.isWeekend = false;
    if(event.index == 0) {
      this.get_explore_event_details();
    }
    if(event.index == 1) {
      this.get_today_events();
    }
    if(event.index == 2) {
      this.get_tomorrow_events()
    }
    if(event.index == 3) {
      this.get_weekend_events();
    }
  }

  add_analytics_data() {
    const final_data = {
      'input_data': []
    };
    const input_final_data = [];
    for (let i = 0; i <  this.events_explore.length; i++) {
      const final_key_value_pair = {
        'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.EVENT,
        'entity_id': undefined,
        'interface': INTERFACE_ENUM.FE,
        'action': ACTION.VIEW,
        'referrer': '/root/home'
      };
      final_key_value_pair['entity_id'] =  this.events_explore[i].id;
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
    window.location.href='http://m.me/kinparenting';
  }
}
