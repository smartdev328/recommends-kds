import { Injectable } from '@angular/core';
import {UrlConstants} from '../constants/UrlConstants';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddCampService {

  public URLConstants = new UrlConstants();
  constructor(private http:  HttpClient) { }

  add_camp (api_input: any) {
    let url = this.URLConstants.API_URL + 'camps/';
    return this.http.post(url , api_input);
  }
}
