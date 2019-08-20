import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "@shared/constants/UrlConstants";
import { UserRequest } from "@shared/model/request-body";
import { User } from "@shared/model/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient
    ) {}

    getUser() {
        // TODO: this API use hard code user (web:385649). Need to change after enable Authz in backend
        return this.http.get<User>(API_URL + 'users/web:385649');
    }

    createUser(user: UserRequest) {
        return this.http.post(API_URL + 'users', user);
    }
}
