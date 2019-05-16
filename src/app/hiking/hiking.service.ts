import { Injectable } from '@angular/core';
import {UrlConstants} from '../constants/UrlConstants';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HikingTrailService {
  public URLConstants = new UrlConstants();
  constructor(private  http:  HttpClient) {

  }

  get_hiking_trail_by_id (trail_id: any) {
    const url = this.URLConstants.API_URL + 'hiking-trails/' + trail_id + '/';
    console.log(url);
    return this.http.get(url);
  }

}
