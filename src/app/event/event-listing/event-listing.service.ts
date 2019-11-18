import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { API_URL } from '@shared/constants/UrlConstants';

@Injectable({
  providedIn: 'root'
})
export class EventListingService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }


  get_event_details(url) {
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

    delete_event(id) {
      const url = `${API_URL}` + `events/${id}/`;
      return this.http.delete(url);
    }

    update_event(data) {
      const url = API_URL +'events/';
      const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
      return this.http.put(url, data, { headers: headers, responseType: 'text' });
    }

  }
