import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@shared/constants/UrlConstants';
@Injectable({
  providedIn: 'root'
})
export class VenueListingService {

  constructor(private http: HttpClient) { }

  get_venue_details(api_input: any) {
    const url = API_URL + 'venues/?categories=' + 
    encodeURIComponent(api_input.categories) +
      "&q=" + api_input.q +
      "&city=" + encodeURIComponent(api_input.location);
    return this.http.get(url);
  }

  get_Saved_Venues(){
    const url = API_URL + 'actions/?entity_type=ETYPE_VENUE&action_type=ATYPE_SAVE';
    return this.http.get(url);
  }

  getSavedListing(type){
    const url = API_URL + `actions/?entity_type=ETYPE_${type}&action_type=ATYPE_SAVE`;
    return this.http.get(url);
  }
}
