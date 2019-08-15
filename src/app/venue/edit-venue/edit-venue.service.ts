import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { API_URL } from '@shared/constants/UrlConstants';

@Injectable({
  providedIn: 'root'
})
export class EditVenueService {


  constructor(private  http:  HttpClient) { }

  get_venue_by_id (venue_id: any) {
    const url = API_URL + 'venues/' + venue_id;
    return this.http.get(url);
  }

  update_venue (api_input: any) {
    const url = API_URL + 'update/venue/';
    return this.http.put(url , api_input);
  }

}
