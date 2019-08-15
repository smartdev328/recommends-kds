import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@shared/constants/UrlConstants';

@Injectable({
  providedIn: 'root'
})

export class VenueService {
  constructor(private http: HttpClient) {

  }

  add_new_venue(api_input: any) {
    const url = API_URL + 'create/venue/';
    return this.http.post(url, api_input);
  }



}
