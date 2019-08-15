import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { API_URL } from '@shared/constants/UrlConstants';

@Injectable({
  providedIn: 'root'
})
export class ApproveVenueReviewsService {
  constructor(private  http:  HttpClient) { }


  get_reviews_by_type (type , approved = true) {
    const url = API_URL + 'reviews/?type=' + type + '&' + 'approved=' + approved ;
    return this.http.get(url);
  }

  approve_reviews (input_data) {
    const url = API_URL + 'approve-reviews/';
    return this.http.patch(url , input_data);
  }
}
