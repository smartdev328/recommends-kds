import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {UrlConstants} from '../constants/UrlConstants';
import {ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION} from '../constants/AnalyticsConstants';
import {ReviewsService} from '../add-review/reviews.service';

@Component({
  selector: 'app-personalized',
  templateUrl: './personalized.component.html',
  styleUrls: ['./personalized.component.css']
})
export class PersonalizedComponent implements OnInit {
  events_explore: any;
  popular: any;
  favorite  : any;
  events_weekend: any;
  isPopular : Boolean = false;
  isFav :Boolean = false;
  isWeekend : Boolean = false;
  public category: string;
  public URLConstatnts = new UrlConstants();
  parent_id: Number;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private datePipe: DatePipe,
              private router: Router,
              private titleService: Title, private reviewService: ReviewsService) {  }

  ngOnInit() {
    this.titleService.setTitle('MY KIN');
    this.parent_id = this.route.snapshot.queryParams['parent_id'];
  

    this.get_event_details();

  }

  get_event_details() {

      let url = '';
        url = this.URLConstatnts.API_URL +  'subscribed-events/?parent_id=' + this.parent_id ;
      const headers = new HttpHeaders()
          .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk');
      this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
          data = data.replace(/\n/g, '');
          data = JSON.parse(data);
          this.favorite = data['events'];
          if(this.favorite.length > 0) {
          this.isFav = true;
          }
      });
      url = this.URLConstatnts.API_URL +  'events/?tags=popular&parent_id=' + this.parent_id ;
      this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
          data = data.replace(/\n/g, '');
          data = JSON.parse(data);
          this.popular = data['events'];
          if(this.popular.length > 0) {
          this.isPopular = true;
          }
      });

       url = 'https://kin-api.kinparenting.com/events?event_range_str=weekend&limit=3';
      this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
          data = data.replace(/\n/g, '');
          data = JSON.parse(data);
          this.events_weekend = data['events'];
          if(this.events_weekend.length > 0) {
          this.isWeekend = true;
          }

      });

}

}
