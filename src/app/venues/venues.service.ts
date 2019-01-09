import { Injectable } from '@angular/core';
import {UrlConstants} from '../constants/UrlConstants';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VenuesService {
  public URLConstants = new UrlConstants();
  constructor(private  http:  HttpClient) {

  }

  get_venue_by_id (venue_id: any) {
    const url = this.URLConstants.API_URL + 'venues/' + venue_id + '/';
    return this.http.get(url);
  }

  get_reviews_by_type (type , approved = true) {
    const url = this.URLConstants.API_URL + 'reviews/?type=' + type + '&' + 'approved=' + approved ;
    return this.http.get(url);
  }
}
