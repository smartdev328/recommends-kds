import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {UrlConstants} from '../constants/UrlConstants';
import {ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION} from '../constants/AnalyticsConstants';
import {ReviewsService} from '../add-review/reviews.service';

declare let ga: any;
@Component({
  selector: 'app-camp-listing',
  templateUrl: './camp-listing.component.html',
  styleUrls: ['./camp-listing.component.css']
})
export class CampListingComponent implements OnInit {
  camp_explore;
  isExplore: Boolean;
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
                this.isExplore = false;
              }

  ngOnInit() {
    this.titleService.setTitle('Camps');
    this.category = this.route.snapshot.queryParams['category'];
    this.get_camps_details();

  }

  get_camps_details() {

    this.isExplore = false;
      let url = '';
      if (this.category === undefined ) {
         url = this.URLConstatnts.API_URL +  'camps/' ;
      } else {
         url = this.URLConstatnts.API_URL + 'camps/?category=' + this.category;
      }
      const headers = new HttpHeaders()
          .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk');
      this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
          data = data.replace(/\n/g, '');
          data = JSON.parse(data);
          this.camp_explore = data['data'];
          this.isExplore = true;
          //this.add_analytics_data();
      });

}

add_analytics_data() {
  const final_data = {
    'input_data': []
  };
  const input_final_data = [];
  for (let i = 0; i < this.camp_explore.length; i++) {
    const final_key_value_pair = {
      'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.CAMP,
      'entity_id': undefined,
      'interface': INTERFACE_ENUM.FE,
      'action': ACTION.VIEW,
      'referrer': '/root/home'
    };
    final_key_value_pair['entity_id'] = this.camp_explore[i].id;
    input_final_data.push(final_key_value_pair);
  }
  final_data['input_data'] = input_final_data;
  this.reviewService.add_analytics_actions(final_data).subscribe(data => {
  }, error => {
    alert('Something went wrong');
  });

}
  kin_redirect() {
    ga('send', 'camp', {
      eventCategory: 'Clicks',
      eventLabel: 'Kin Redirect',
      eventAction: 'Click on kin redirect button'
    });
    window.location.href='http://m.me/kinparenting';
  }
}
