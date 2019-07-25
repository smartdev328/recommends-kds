import { Injectable } from '@angular/core';
import { UrlConstants } from '../../constants/UrlConstants';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class HikingTrailsListingService {

  public URLConstants = new UrlConstants();
  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  get_hiking_trail_details(api_input: any) {
    const url = this.URLConstants.API_URL + 'hiking-trails/?limit=40' +
      '&q=' + encodeURIComponent(api_input.q);
    return this.http.get(url);
  }
}
