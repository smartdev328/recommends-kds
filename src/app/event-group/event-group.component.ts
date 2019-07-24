import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

declare let ga: any;
@Component({
  selector: 'app-event-group',
  templateUrl: './event-group.component.html',
  styleUrls: ['./event-group.component.css']
})
export class EventGroupComponent implements OnInit {
  event_query: string;
  events: any;
  isLoaded = false;

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
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
    this.event_query = this.route.snapshot.params['query'];
    this.titleService.setTitle(this.event_query);
    this.get_event_details();
  }

  kin_redirect() {
    ga('send', 'event', {
      eventCategory: 'Clicks',
      eventLabel: 'Kin Redirect',
      eventAction: 'Click on kin redirect button'
    });
    window.location.href = 'http://m.me/kinparenting';
  }

  event_redirect(id) {
    this.router.navigate(['/event', id]);
  }

  format_time(timeString) {
    const H = +timeString.substr(0, 2);
    const h = H % 12 || 12;
    const ampm = (H < 12 || H === 24) ? "AM" : "PM";
    timeString = h + timeString.substr(2, 3) + ampm;
    return timeString;
  }

  get_event_details() {
    const url = "https://kin-api.kinparenting.com/events?q=" + this.event_query;
    const headers = new HttpHeaders()
      .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk');
    this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
      data = data.replace(/\n/g, "");
      data = JSON.parse(data);
      this.events = data["events"];
      this.isLoaded = true;
    });
  }

  capital_name(query) {
    return query;
  }
}

