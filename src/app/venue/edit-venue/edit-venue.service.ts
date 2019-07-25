import { Injectable } from '@angular/core';
import {UrlConstants} from '../../constants/UrlConstants';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditVenueService {

  public URLConstatnts = new UrlConstants();

  constructor(private  http:  HttpClient) { }

  get_venue_by_id (venue_id: any) {
    const url = this.URLConstatnts.API_URL + 'venues/' + venue_id;
    return this.http.get(url);
  }

  update_venue (api_input: any) {
    const url = this.URLConstatnts.API_URL + 'update/venue/';
    return this.http.put(url , api_input);
  }

}
