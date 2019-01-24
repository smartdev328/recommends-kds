import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {UrlConstants} from '../constants/UrlConstants';

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
              private titleService: Title) { 
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
    }
    else {
      let url = '';
      if (this.category === undefined ) {
        url = this.URLConstatnts.API_URL +  'venues/' ;
     } else {
        url = this.URLConstatnts.API_URL + 'venues/?category=' + this.category;
     }
      const headers = new HttpHeaders()
          .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk');
      this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
          data = data.replace(/\n/g, '');
          data = JSON.parse(data);
          this.venues_list = data['venues'];
          this.isExplore = true;
      });
    }
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
