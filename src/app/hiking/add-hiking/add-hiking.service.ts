import { Injectable } from '@angular/core';
import { UrlConstants } from '../../constants/UrlConstants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddHikingTrailService {

  public URLConstants = new UrlConstants();
  constructor(private http: HttpClient) { }

  add_hiking_trail(api_input: any) {
    const url = this.URLConstants.API_URL + 'hiking-trails/';
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(url, api_input, { headers: headers, responseType: 'text' });
  }
  update_hiking_trail(api_input: any) {
    const url = this.URLConstants.API_URL + 'hiking-trails/';
    return this.http.put(url, api_input);
  }
}
