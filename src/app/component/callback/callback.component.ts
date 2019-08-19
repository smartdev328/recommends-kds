import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/service/auth.service';
import { Router } from '@angular/router';
import { CommonUtil } from '@shared/utils/common-util';
import { UserRequest } from '@shared/model/request-body';
import { UserService } from '@shared/service/user.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

 constructor(private auth: AuthService) { }

 ngOnInit() {
   this.auth.handleAuthCallback();
 }
}
