import { Injectable } from '@angular/core';
import {UrlConstants} from '../constants/UrlConstants';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchVenueService {

  public URLConstatnts = new UrlConstants();

  constructor(private  http:  HttpClient) { }

  search_venue (query: any) {
    const url = this.URLConstatnts.API_URL + 'venues?q=' + query;
    return this.http.get(url);
  }

  get_venue_by_id (venue_id: any) {
    const url = this.URLConstatnts.API_URL + 'venues/' + venue_id;
    return this.http.get(url);
  }
}
