import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "@shared/constants/UrlConstants";
import { UserRequest } from "@shared/model/request-body";
import { User } from "@shared/model/user";
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, } from 'rxjs'
@Injectable({
    providedIn: 'root'
})
export class UserService {
    private subject = new BehaviorSubject<any>(0);
    public mysubject = this.subject.asObservable();
  
    getToken(): Observable<any> {
      return this.subject.asObservable();
    }
    sendToken(data) {
      this.subject.next(data);
    }
  
    constructor(
        private http: HttpClient,
        // private Auth : AuthService
    ) { }
   
    getUser() {
        // TODO: this API use hard code user (web:385649). Need to change after enable Authz in backend
        return this.http.get<User>(API_URL + 'parents/').pipe(map((response) => {
            return response.error ? new User() : response;
        }));
    }

    gethttpOptions() {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                // 'x-api-key': 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk',
                "Authorization": `Bearer ${this.subject.value}`
            })
        };
        return httpOptions;
    }

    //create user
    createUser(user: UserRequest) {
        return this.http.post(API_URL + 'parents/', user);
    }

    // Update user
    updateUser(res) {
        const httpOptions = this.gethttpOptions();
        return this.http.patch(API_URL + 'parents/', res, httpOptions);
    }

    // Create kid
    createKid(inputObject: any) {
        const httpOptions = this.gethttpOptions();
        return this.http.post(API_URL + 'kids/', inputObject, httpOptions);
    }

    updateKids(inputObject: any) {
        const httpOptions = this.gethttpOptions();
        return this.http.put(API_URL + 'kids/', inputObject, httpOptions);
    }
}
