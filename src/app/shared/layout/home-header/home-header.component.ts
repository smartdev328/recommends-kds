import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SignUpComponent } from '../../../component/sign-up/sign-up.component';
import { AuthService } from '@shared/service/auth.service';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})

export class HomeHeaderComponent implements OnInit {
  modalRef: BsModalRef;
  private auth0Client: Auth0Client;
  public navbarCollapsed = true;
  profile: any;
  isAuthenticated: boolean;

  constructor(
    private modalService: BsModalService,
    private authService: AuthService,
    private router: Router
  ) { }


  async ngOnInit() {
    this.auth0Client = await this.authService.getAuth0Client();
    this.authService.isAuthenticated.subscribe((value) => {
      this.isAuthenticated = value;
    });
    this.authService.profile.subscribe(profile => {
      this.profile = profile;
    });
  }

  openModal() {
    // const initialState = { class: 'modal-lg', listener: this };
    // this.modalRef = this.modalService.show(SignUpComponent, initialState);
    this.router.navigate(['profile']);
  }

  async signIn() {
    await this.auth0Client.loginWithRedirect({});
  }

  logout() {
    this.auth0Client.logout({
      client_id: this.authService.config.client_id,
      returnTo: window.location.origin
    });
  }
}
