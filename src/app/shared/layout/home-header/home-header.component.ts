import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SignUpComponent } from '../../../component/sign-up/sign-up.component';
import { AuthService } from '@shared/service/auth.service';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

 
import 'sweetalert2/src/sweetalert2.scss'
import { SwalService } from '@shared/service/swal.service';

@Component({
  selector: 'app-layout-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})

export class HomeHeaderComponent implements OnInit {
  modalRef: BsModalRef;
  public navbarCollapsed = true;
  profile: any;
  //isAuthenticated: boolean;
  public isAuthenticated$: Observable<boolean>;
  isLogedin = false;
 
  constructor(
    public auth: AuthService,
    private router: Router,
    private swal:SwalService

  ) { }


  ngOnInit() {
    //this.isAuthenticated = await this.auth.getAuth0Client().;
    /*this.authService.profile.subscribe(profile => {
      this.profile = profile;
    });*/
    //this.profile = this.auth.getUser$();

    this.isAuthenticated$= this.auth.isAuthenticated$;
    this.isAuthenticated$.subscribe(data => {
      this.isLogedin = data;
    })
  }

  openModal() {
    // const initialState = { class: 'modal-lg', listener: this };
    // this.modalRef = this.modalService.show(SignUpComponent, initialState);
    this.router.navigate(['profile']);
  }

  /*
  async signIn() {
    await this.auth0Client.loginWithRedirect({});
  }

  logout() {
    this.auth0Client.logout({
      client_id: this.authService.config.client_id,
      returnTo: window.location.origin
    });
  }
  */

 checkloginin(linkName){
   console.log('wwwwwwwwwwwwwww', this.isLogedin)
  if(this.isLogedin){
    if(linkName =="Event"){
      this.router.navigate(['/family-friendly-events-near-me']);
    }
    else if(linkName =="Places"){
      this.router.navigate(['/family-friendly-places-near-me']);
    } else if(linkName =="Camps"){
      this.router.navigate(['/camps-near-me']);
    } else if(linkName =="Hiking"){
      this.router.navigate(['/family-friendly-hikes-near-me']);
    }
   

  }else{
    this.swal.showWarning(`Sign in to Follow this ${linkName}`)
  }
}
}
