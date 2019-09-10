import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { API_URL } from '@shared/constants/UrlConstants';

@Injectable({
  providedIn: 'root'
})
export class VenuesService {
  constructor(private  http:  HttpClient) {

  }

  get_venue_by_id (venue_id: any) {
    const url = API_URL + 'venues/' + venue_id + '/';
    //const url = 'https://kin-api-dev.kinparenting.com/' + 'venues/' + venue_id + '/';
    return this.http.get(url);
  }

  add_subscriptions (api_input: any) {
    const url = API_URL + 'subscribe-venue/';
    return  this.http.post(url , api_input);
  }

  remove_subscriptions (parent_id: any, venue_id: any) {
    const url = API_URL + 'subscribe-venue/?parent_id=' + parent_id + '&' + 'venue_id=' + venue_id;
    return  this.http.delete(url);
  }
  remove_all_subscriptions (parent_id: any) {
    const url = API_URL + 'subscribe-venue/?parent_id=' + parent_id ;
    return  this.http.delete(url);
  }

  verify_subscribe_venue (parent_id: any, venue_id: any) {
    const url = API_URL + 'subscribe-venue/?parent_id=' + parent_id + '&' + 'venue_id=' + venue_id;

    return  this.http.get(url);
  }



}
