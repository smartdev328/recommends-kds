import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { API_URL } from '@shared/constants/UrlConstants';

@Injectable({
  providedIn: 'root'
})
export class EventListingService {

  constructor(private http:  HttpClient, private datePipe: DatePipe) { }
  get_event_details (api_input: any) {
    const url = API_URL + 'events/?event_date_start='
       + this.datePipe.transform(Date.now(), 'yyyy-MM-dd') + '&limit=90'  +
    '&category=' + encodeURIComponent(api_input.category) +
    '&q=' + encodeURIComponent(api_input.q) +
    '&city=' + encodeURIComponent(api_input.city) +
    '&event_range_str=' + encodeURIComponent(api_input.event_range_str) +
    '&distance=' + encodeURIComponent(api_input.distance) +
    '&username=' + encodeURIComponent(api_input.username) +
    '&order_by=date_dist_asc';

    return this.http.get(url);
  }
}
