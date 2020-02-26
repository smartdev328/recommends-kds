import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from '@shared/service/auth.service';
import { UserService } from '@shared/service/user.service';
import { Observable } from 'rxjs';
import { User } from '@shared/model/user';


@Component({
  selector: 'app-add-reco',
  templateUrl: './add-reco.component.html',
  styleUrls: ['./add-reco.component.css']
})

export class AddRecoComponent implements OnInit {
  isLoggedin: boolean;
  public isAuthenticated$: Observable<boolean>;
  airtableUrl: string;
  public user: User;

  constructor(
    private userService: UserService,
    private auth: AuthService
  ) {
    this.isAuthenticated$= this.auth.isAuthenticated$;
    this.isAuthenticated$.subscribe(data => {
      this.isLoggedin = data;
      this.auth.setAuth(this.isLoggedin);
      
    })
   }

  ngOnInit() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.airtableUrl = "https://airtable.com/embed/shr0wVQVir8zdUoHy?prefill_Recommender="
                    + encodeURIComponent(this.user.parent.first_name)
                    + "&prefill_KinId=" + encodeURIComponent(this.user.parent.parent_id);
    });
  }
}
