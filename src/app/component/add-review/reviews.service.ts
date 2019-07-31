import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UrlConstants } from '@shared/constants/UrlConstants';


@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  public URLConstants = new UrlConstants();
  constructor(private http:  HttpClient) { }

  add_review (api_input: any) {
    const url = this.URLConstants.API_URL + 'reviews/';
    return this.http.post(url , api_input);
  }
  get_reviews_by_type (type , approved = true, entity_id) {
    const url = this.URLConstants.API_URL + 'reviews/?type=' + type + '&' + 'approved=' + approved + '&entity_id=' + entity_id;
    return this.http.get(url);
  }
  add_analytics_actions (analytics_input: any) {

    const url = this.URLConstants.API_URL + 'actions/';
    return this.http.post(url , analytics_input);
  }
  verify_save_action (parent_id: any, type: any,  entity_id: any) {
    const url = this.URLConstants.API_URL + 'parent-actions/?parent_id=' + parent_id +
    '&entity_id=' + entity_id + '&entity_type=' + type + '&action=ATYPE_SAVE';
    return  this.http.get(url);
  }


}
