import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { API_URL } from '@shared/constants/UrlConstants';
//const API_URL = 'https://kin-api-dev.kinparenting.com/';
@Injectable({
  providedIn: 'root'
})
export class HikingTrailsListingService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  get_hiking_trail_details(url: any) {
    // const url = API_URL + 'hiking-trails/?limit=40' +
    //   '&q=' + encodeURIComponent(api_input.q);
    return this.http.get(url);
  }

  getSavedHikingList(){
    const url =  API_URL  +'actions/?entity_type=ETYPE_hiking-trails&action_type=ATYPE_SAVE';
    
    return this.http.get(url);
  }
}
