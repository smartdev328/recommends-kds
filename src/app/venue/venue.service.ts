import { Injectable } from '@angular/core';
import { UrlConstants } from '../shared/constants/UrlConstants';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})

export class VenueService {
  public URLConstatnts = new UrlConstants();
  constructor(private http: HttpClient) {

  }

  add_new_venue(api_input: any) {
    const url = this.URLConstatnts.API_URL + 'create/venue/';
    return this.http.post(url, api_input);
  }



}
