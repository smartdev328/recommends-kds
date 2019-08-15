import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "@shared/constants/UrlConstants";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(
        private http: HttpClient
    ) {}

    createUser(user) {
        return this.http.post(API_URL + '/users', user);
    }
}
