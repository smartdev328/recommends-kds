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

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  async ngOnInit() {
    const client = await this.authService.getAuth0Client();
    const result = await client.handleRedirectCallback();

    const targetRoute = result.appState && result.appState.target ? result.appState.target : '';

    this.authService.isAuthenticated.next(await client.isAuthenticated());
    this.authService.profile.next(await client.getUser());
    client.getUser().then((user) => {
      this.authService.profile.next(user);
      if (user['http://user.information/loginCount'] == 1) {
        // Fist login, create a new account
        const userRequest = new UserRequest(CommonUtil.initRequestBody());
        userRequest.email = user.email;
        this.userService.createUser(userRequest).subscribe((response) => {
          this.router.navigate(['profile']);
        });
      } else {
        this.router.navigate([targetRoute]);
      }
    });


  }
}
