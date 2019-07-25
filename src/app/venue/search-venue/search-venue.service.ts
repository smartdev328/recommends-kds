import { Injectable } from '@angular/core';
import {UrlConstants} from '../../constants/UrlConstants';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchVenueService {

  public URLConstants = new UrlConstants();

  constructor(private  http:  HttpClient) { }

  search_venue (query_term: String) {
    const url = this.URLConstants.API_URL + 'venues/?q=' + query_term;
    return this.http.get(url);
  }

  get_venue_by_id (venue_id: any) {
    const url = this.URLConstants.API_URL + 'venues/' + venue_id + '/';
    return this.http.get(url);
  }

  get_venues_by_name_city(name: String , city: String) {
    const url = this.URLConstants.API_URL + 'venues/?name=' + name + '&city=' + city;
    return this.http.get(url);
  }
}
