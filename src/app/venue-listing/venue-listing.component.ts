import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {UrlConstants} from '../constants/UrlConstants';
import {ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION} from '../constants/AnalyticsConstants';
import {ReviewsService} from '../add-review/reviews.service';

declare let ga: any;
@Component({
  selector: 'app-venue-listing',
  templateUrl: './venue-listing.component.html',
  styleUrls: ['./venue-listing.component.css']
})
export class VenueListingComponent implements OnInit {
  venues_list;
  isExplore: Boolean = false;
  public category: string;
  public URLConstatnts = new UrlConstants();

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
    this.titleService.setTitle('Venues');
    this.category = this.route.snapshot.queryParams['category'];
    this.get_venue_details();
  }

  get_venue_details() {
    if(this.venues_list) {
      this.isExplore = true;
    } else {
      let url = '';
      if (this.category === undefined ) {
        url = 'https://kin-api-dev.kinparenting.com/venues/' ;
     } else {
        url = this.URLConstatnts.API_URL + 'venues/?categories=' + this.category;
     }
      const headers = new HttpHeaders()
          .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk');
      this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
          data = data.replace(/\n/g, '');
          data = JSON.parse(data);
          this.venues_list = data['venues'];
          this.add_analytics_data();
          this.isExplore = true;
      });
    }
  }


  add_analytics_data() {
    const final_data = {
      'input_data': []
    };
    const input_final_data = [];
    for (let i = 0; i <  this.venues_list.length; i++) {
      const final_key_value_pair = {
        'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.VENUE,
        'entity_id': undefined,
        'interface': INTERFACE_ENUM.FE,
        'action': ACTION.VIEW,
        'referrer': '/root/home'
      };
      final_key_value_pair['entity_id'] =  this.venues_list[i].id;
      input_final_data.push(final_key_value_pair);
    }
    final_data['input_data'] = input_final_data;
    this.reviewService.add_analytics_actions(final_data).subscribe(data => {
    }, error => {
      alert('Something went wrong');
    });
  }

  kin_redirect() {
    ga('send', 'venue', {
      eventCategory: 'Clicks',
      eventLabel: 'Kin Redirect',
      eventAction: 'Click on kin redirect button'
    });
    window.location.href='http://m.me/kinparenting';
  }
}
