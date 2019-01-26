import { Injectable } from '@angular/core';
import {UrlConstants} from '../constants/UrlConstants';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  public URLConstants = new UrlConstants();
  constructor(private http:  HttpClient) { }

  add_review (api_input: any) {
    let url = this.URLConstants.API_URL + 'reviews/';
    return this.http.post(url , api_input);
  }
  get_reviews_by_type (type , approved = true) {
    const url = this.URLConstants.API_URL + 'reviews/?type=' + type + '&' + 'approved=' + approved ;
    return this.http.get(url);
  }
  add_analytics_actions (analytics_input: any) {

    let url = this.URLConstants.API_URL + 'actions/';
    return this.http.post(url , analytics_input);
  }


}
