import { Injectable } from '@angular/core';
import { API_URL } from '../../shared/constants/UrlConstants';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CampListingService {

  constructor(private http: HttpClient) { }

  get_camp_details(url: string) {
    return this.http.get(url, { responseType: 'text' });
  }
}
