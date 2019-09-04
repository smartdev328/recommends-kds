import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { API_URL } from '@shared/constants/UrlConstants';
const API_URL = 'https://kin-api-dev.kinparenting.com/';


@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  constructor(private http:  HttpClient) { }

  add_review (api_input: any) {
    const url = API_URL + 'reviews/';
    return this.http.post(url , api_input);
  }
  get_reviews_by_type (type , approved = true, entity_id) {
    const url = API_URL + 'reviews/?type=' + type + '&' + 'approved=' + approved + '&entity_id=' + entity_id;
    return this.http.get(url);
  }
  add_analytics_actions (analytics_input: any) {
    const url = API_URL + 'actions/';
    return this.http.post(url , analytics_input);
  }
  verify_save_action (parent_id: any, type: any,  entity_id: any) {
    const url = API_URL + 'parent-actions/?parent_id=' + parent_id +
    '&entity_id=' + entity_id + '&entity_type=' + type + '&action=ATYPE_SAVE';
    return  this.http.get(url);
  }


}
