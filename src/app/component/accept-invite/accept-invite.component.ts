import { Component, OnInit, ɵConsole, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { EventConstants } from '@shared/constants/EventConstants';
import { Kid } from '@shared/model/kid';
import { Referral } from '@shared/model/account';
import { UserRequest } from '@shared/model/request-body';
import { CommonUtil } from '@shared/utils/common-util';
import { UserService } from '@shared/service/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '@shared/service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accept-invite',
  templateUrl: './accept-invite.component.html',
  styleUrls: ['./accept-invite.component.css']
})
export class AcceptInviteComponent implements OnInit {
  isLogedin: boolean;
  formGroup: FormGroup;
  referrals: Referral[];
  referralControls: FormArray;
  public isAuthenticated$: Observable<boolean>;


  newsletter = false;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
  ) {
    this.isAuthenticated$ = this.auth.isAuthenticated$;
    this.isAuthenticated$.subscribe(data => {
      this.isLogedin = data;
      this.auth.setAuth(this.isLogedin);
    });
   }

  ngOnInit() {
    this.formGroup = new FormGroup({
      referralControls: this.formBuilder.array([])
    });
    this.referrals = [];
    this.userService.getUser().subscribe((user) => {
      this.formGroup.controls.setValue;
      if (user.parent) {
        this.referrals = user.referrals ? user.referrals : [new Referral()];
        this.initializeReferrals(this.referrals);
      }

    });
  }

  initializeReferrals(referrals: Referral[]) {
    this.referralControls = this.formGroup.get('referralControls') as FormArray;
    for (let i = 0; i < referrals.length; i++) {
      this.referralControls.push(new FormGroup({
        referral_id: new FormControl(referrals[i].id),
        referrer_name: new FormControl(referrals[i].referrer),
        accept: new FormControl(false),
      }));
    }
  }

  save() {
    let referralsLength = 0;
    if (this.formGroup.value.referralControls !== undefined) {
      referralsLength = this.formGroup.value.referralControls.length;
    }

    if (referralsLength > 0) {
      this.userService.addFriends(this.formGroup.value.referralControls).subscribe(
        responseReferral => {
              this.router.navigate(['/home']);
        });
    } else {
          this.router.navigate(['/home']);
    }

    this.router.navigate(['/home']);

  }

  back() {
    this.router.navigate(['/home']);
  }
}
