import { Injectable } from '@angular/core';
import { API_URL } from '../../shared/constants/UrlConstants';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CampListingService {

  constructor(private http: HttpClient) { }

  get_camp_details(api_input: any) {
    const url = API_URL + 'camps/?category=' + api_input.category +
      "&q=" + api_input.q;
    return this.http.get(url);
  }
}
