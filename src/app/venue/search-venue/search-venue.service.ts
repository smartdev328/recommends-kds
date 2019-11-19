import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { API_URL } from '@shared/constants/UrlConstants';

@Injectable({
  providedIn: 'root'
})
export class SearchVenueService {


  constructor(private  http:  HttpClient) { }

  search_venue (query_term: String) {
    const url = API_URL + 'venues/?q=' + query_term + '&distance=100';
    return this.http.get(url);
  }

  get_venue_by_id (venue_id: any) {
    const url = API_URL + 'venues/' + venue_id + '/';
    return this.http.get(url);
  }

  get_venues_by_name_city(name: String , city: String) {
    const url = API_URL + 'venues/?name=' + name + '&city=' + city;
    return this.http.get(url);
  }
}
