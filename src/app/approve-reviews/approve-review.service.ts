import { Injectable } from '@angular/core';
import {UrlConstants} from '../constants/UrlConstants';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApproveVenueReviewsService {
  public URLConstants = new UrlConstants();
  constructor(private  http:  HttpClient) { }


  get_reviews_by_type (type , approved = true) {
    const url = this.URLConstants.API_URL + 'reviews/?type=' + type + '&' + 'approved=' + approved ;
    return this.http.get(url);
  }

  approve_reviews (input_data) {
    const url = this.URLConstants.API_URL + 'approve-reviews/';
    return this.http.patch(url , input_data);
  }
}
