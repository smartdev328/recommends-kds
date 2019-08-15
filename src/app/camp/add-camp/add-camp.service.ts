import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@shared/constants/UrlConstants';

@Injectable({
  providedIn: 'root'
})
export class AddCampService {

  constructor(private http: HttpClient) { }

  add_camp(api_input: any) {
    const url = API_URL + 'camps/';
    return this.http.post(url, api_input);
  }
  update_camp(api_input: any) {
    const url = API_URL + 'camps/';
    return this.http.put(url, api_input);
  }
}
