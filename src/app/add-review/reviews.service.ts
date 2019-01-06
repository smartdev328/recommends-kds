import { Injectable } from '@angular/core';
import {UrlConstants} from '../constants/UrlConstants';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  public URLConstatnts = new UrlConstants();
  constructor(private http:  HttpClient) { }

  add_review (api_input: any) {
    let url = this.URLConstatnts.API_URL + 'reviews/';
    return this.http.post(url , api_input);
  }
}
