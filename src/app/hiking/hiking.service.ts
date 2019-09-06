import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { API_URL } from '@shared/constants/UrlConstants';
// const API_URL = 'https://kin-api-dev.kinparenting.com/';
@Injectable({
  providedIn: 'root'
})
export class HikingTrailService {
  constructor(private  http:  HttpClient) {

  }

  get_hiking_trail_by_id (trail_id: any) {
    const url = API_URL + 'hiking-trails/' + trail_id + '/';
    return this.http.get(url);
  }

}
