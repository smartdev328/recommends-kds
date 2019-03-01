import { Injectable } from '@angular/core';
import {UrlConstants} from '../constants/UrlConstants';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EventListingService {

  public URLConstants = new UrlConstants();
  constructor(private http:  HttpClient) { }
  get_event_details (api_input: any) {
    const url = this.URLConstants.API_URL + 'events/?category=' +
    encodeURIComponent(api_input.category) +
    '&q=' + encodeURIComponent(api_input.q) +
    '&city=' + encodeURIComponent(api_input.city) +
    '&event_range_str=' + encodeURIComponent(api_input.event_range_str);

    return this.http.get(url);
  }
}
