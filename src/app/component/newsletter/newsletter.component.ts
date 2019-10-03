import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@shared/service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;
  currentUrl: string;
  isLogedin:boolean;
  constructor(private router : Router,
    private authService: AuthService,
  ) { 
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.isAuthenticated$.subscribe(data => {
      this.isLogedin = data;
    })
  }
  ngOnInit() {
    if(this.isLogedin == false){
       this.authService.login();
    }



  }

}
