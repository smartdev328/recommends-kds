import { Injectable } from '@angular/core';
import { UrlConstants } from '../../constants/UrlConstants';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CampListingService {

  public URLConstants = new UrlConstants();
  constructor(private http: HttpClient) { }

  get_camp_details(api_input: any) {
    const url = this.URLConstants.API_URL + 'camps/?category=' + api_input.category +
      "&q=" + api_input.q;
    return this.http.get(url);
  }
}
