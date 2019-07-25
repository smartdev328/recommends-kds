import { Injectable } from '@angular/core';
import { UrlConstants } from '../../constants/UrlConstants';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VenueListingService {

  public URLConstants = new UrlConstants();
  constructor(private http: HttpClient) { }

  get_venue_details(api_input: any) {
    const url = this.URLConstants.API_URL + 'venues/?categories=' +
      encodeURIComponent(api_input.categories) +
      "&q=" + api_input.q +
      "&city=" + encodeURIComponent(api_input.location);
    return this.http.get(url);
  }
}
