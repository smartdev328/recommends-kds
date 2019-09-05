import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/service/auth.service';

@Component({
  selector: 'app-middleware',
  templateUrl: './middleware.component.html',
  styleUrls: ['./middleware.component.css']

})
export class MiddlewareComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
    setTimeout(() => {
      this.auth.login()
    }, 100)
  }

}
