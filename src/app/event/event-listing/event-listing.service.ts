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
    let url = `${API_URL}` + 'events/?event_date_start='+ this.datePipe.transform(Date.now(), 'yyyy-MM-dd') + '&limit=90'+'&category=' + encodeURIComponent(api_input.category) +'&q=' + encodeURIComponent(api_input.q) +'&city=' + encodeURIComponent(api_input.city) +'&event_range_str=' + encodeURIComponent(api_input.event_range_str)+ '&order_by=date_dist_asc';
   if(api_input.distance){
   url = `${API_URL}` + 'events/?event_date_start='+ this.datePipe.transform(Date.now(), 'yyyy-MM-dd') + '&limit=90'+'&category=' + encodeURIComponent(api_input.category) +'&q=' + encodeURIComponent(api_input.q) +'&city=' + encodeURIComponent(api_input.city) +'&event_range_str=' + encodeURIComponent(api_input.event_range_str) +'&order_by=date_dist_asc'+'&distance=' + encodeURIComponent(api_input.distance)
   }
   if(api_input.kid_id){
     url = `${API_URL}` + 'events/?event_date_start='+ this.datePipe.transform(Date.now(), 'yyyy-MM-dd') + '&limit=90'+'&category=' + encodeURIComponent(api_input.category) +'&q=' + encodeURIComponent(api_input.q) +'&city=' + encodeURIComponent(api_input.city) +'&event_range_str=' + encodeURIComponent(api_input.event_range_str) +'&order_by=date_dist_asc'+ '&kid_id=' + encodeURIComponent(api_input.kid_id)
   }
   if(api_input.tags){
     url = `${API_URL}` + 'events/?event_date_start='+ this.datePipe.transform(Date.now(), 'yyyy-MM-dd') + '&limit=90'+'&category=' + encodeURIComponent(api_input.category) +'&q=' + encodeURIComponent(api_input.q) +'&city=' + encodeURIComponent(api_input.city) +'&event_range_str=' + encodeURIComponent(api_input.event_range_str) +'&order_by=date_dist_asc'+ '&tags=' + encodeURIComponent(api_input.tags)
   }
   if(api_input.all){
     url = `${API_URL}` + 'events/?order_by=date_dist_asc&distance=100&limit=80';
   }
    return this.http.get(url);

  }
    get_Saved_event_details() {
      const url = `${API_URL}` + 'actions/?entity_type=ETYPE_EVENT&action_type=ATYPE_SAVE';
      return this.http.get(url);
    }

    subscribe_events() {
      const url = `${API_URL}` + 'subscribed-events/';
      return this.http.get(url);
    }


  }
