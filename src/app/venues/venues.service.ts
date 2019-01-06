import { Injectable } from '@angular/core';
import {UrlConstants} from '../constants/UrlConstants';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VenuesService {
  public URLConstatnts = new UrlConstants();
  constructor(private  http:  HttpClient) {

  }

  get_venue_by_id (venue_id: any) {
    const url = this.URLConstatnts.API_URL + 'venues/' + venue_id + "/";
    return this.http.get(url);
  }
}
