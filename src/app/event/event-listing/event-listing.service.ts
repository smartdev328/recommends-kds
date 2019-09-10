import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { API_URL } from '@shared/constants/UrlConstants';

@Injectable({
  providedIn: 'root'
})
export class EventListingService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }


  get_event_details(api_input) {
    // const httpOptions = this.gethttpOptions();
    const url = `${API_URL}` + 'events/?event_date_start='
    //  const url = 'http://ec2-54-215-142-151.us-west-1.compute.amazonaws.com/'+'events/?event_date_start=2019-08-22&limit=90';
       + this.datePipe.transform(Date.now(), 'yyyy-MM-dd') + '&limit=90'+
    '&category=' + encodeURIComponent(api_input.category) +
    '&q=' + encodeURIComponent(api_input.q) +
    '&city=' + encodeURIComponent(api_input.city) +
    '&event_range_str=' + encodeURIComponent(api_input.event_range_str) +
    '&distance=' + encodeURIComponent(api_input.distance) +
    //'&username=' + encodeURIComponent(api_input.username) +
    '&order_by=date_dist_asc';
    return this.http.get(url);

  }
    get_Saved_event_details() {
      const url = `${API_URL}` + 'actions/?entity_type=ETYPE_EVENT&action_type=ATYPE_SAVE';
      return this.http.get(url);
    }
  }
