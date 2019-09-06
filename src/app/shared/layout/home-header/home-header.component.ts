import { Component, OnInit ,ViewChild} from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SignUpComponent } from '../../../component/sign-up/sign-up.component';
import { AuthService } from '@shared/service/auth.service';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialogRef,MatDialog,} from "@angular/material";
 import 'sweetalert2/src/sweetalert2.scss'
import { SwalService } from '@shared/service/swal.service';
//import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-layout-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})

export class HomeHeaderComponent implements OnInit {
  @ViewChild('deleteuser')deleteuser: TemplateRef<any>

  dialogRef:any;
  modalRef: BsModalRef;
  public navbarCollapsed = true;
  profile: any;
  ClickName:any;
  //isAuthenticated: boolean;
  public isAuthenticated$: Observable<boolean>;
  isLogedin = false;
 
  constructor(
    public auth: AuthService,
    private router: Router,
    private swal:SwalService,
    public dialog: MatDialog,




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

closeDialog(){
this.dialogRef.close();
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
}
