import { Injectable } from '@angular/core';
import {UrlConstants} from '../constants/UrlConstants';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class HikingTrailsListingService {

  public URLConstants = new UrlConstants();
  constructor(private http:  HttpClient, private datePipe: DatePipe) { }
  
  get_hiking_trail_details (api_input: any) {
    const url = this.URLConstants.API_URL + 'hiking-trails/?limit=90'  +
    '&q=' + encodeURIComponent(api_input.q);
    
    /*
    '&category=' + encodeURIComponent(api_input.category) +
    '&q=' + encodeURIComponent(api_input.q) +
    '&city=' + encodeURIComponent(api_input.city) +
    '&event_range_str=' + encodeURIComponent(api_input.event_range_str) +
    '&distance=' + encodeURIComponent(api_input.distance) +
    '&username=' + encodeURIComponent(api_input.username) +
    '&order_by=date_dist_asc';
    */

    return this.http.get(url);
  }
}
