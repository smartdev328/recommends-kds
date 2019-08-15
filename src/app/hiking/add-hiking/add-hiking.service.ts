import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '@shared/constants/UrlConstants';

@Injectable({
  providedIn: 'root'
})
export class AddHikingTrailService {

  constructor(private http: HttpClient) { }

  add_hiking_trail(api_input: any) {
    const url = API_URL + 'hiking-trails/';
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(url, api_input, { headers: headers, responseType: 'text' });
  }
  update_hiking_trail(api_input: any) {
    const url = API_URL + 'hiking-trails/';
    return this.http.put(url, api_input);
  }
}
