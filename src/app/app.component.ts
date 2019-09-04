import { Component } from '@angular/core';
import { AuthService } from '@shared/service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'poppins-frontend';
  //isAuthenticated: Observable<boolean>;

  /*
  constructor(
    private authService: AuthService
  ) {
    this.isAuthenticated = this.authService.isAuthenticated.asObservable();
  }
  */

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.auth.localAuthSetup();
  }
}
