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
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {
  isLogedin: boolean;
  parentEmail: any;
  formGroup: FormGroup;
  interests: any[];
  kids: Kid[];
  referrals: Referral[];
  referralControls: FormArray;
  kidControls: FormArray;
  submitted = false;
  eventConstants = new EventConstants();
  public isAuthenticated$: Observable<boolean>;


  newsletter = false;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
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
      firstName: new FormControl(),
      lastName: new FormControl(),
      zipcode: new FormControl(),
      email: new FormControl(),
      newsletter: new FormControl(false),
      kidControls: this.formBuilder.array([]),
      referralControls: this.formBuilder.array([])
    });
    this.interests = this.eventConstants.PRIMARY_CATEGORY.map((item) => item);
    this.kids = [];
    this.referrals = [];
    // this.addChild();
    this.formGroup.controls['email'].disable();
    this.userService.getUser().subscribe((user) => {
      this.formGroup.controls.setValue;
      if (user.parent) {
        this.formGroup.get('firstName').setValue(user.parent.first_name);
        this.formGroup.get('lastName').setValue(user.parent.last_name);
        this.formGroup.get('zipcode').setValue(user.parent.zip_code);
        this.formGroup.get('newsletter').setValue(user.parent.newsletter.toString() == 'True');
        this.formGroup.get('email').setValue(user.parent.email);
        this.parentEmail = user.parent.email;
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

  addChild() {
    this.kids.push(new Kid());
    this.kidControls = this.formGroup.get('kidControls') as FormArray;
    this.kidControls.push(new FormGroup({
      nick_name: new FormControl(),
      age: new FormControl(),
      interests: new FormControl(),
      categories: new FormControl()
    }));
  }

  removechild(i) {
    this.kidControls.removeAt(i);
    this.kids.splice(i, 1);
  }

  onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    } else {

    }
  }

  save() {
    const param = {
      first_name: this.formGroup.value.firstName,
      last_name: this.formGroup.value.lastName,
      zip_code: this.formGroup.value.zipcode,
      // email: this.parentEmail,
      newsletter: this.formGroup.value.newsletter,
    };
    let kidLength = 0;
    if (this.formGroup.value.kidControls !== undefined) {
      kidLength = this.formGroup.value.kidControls.length;
    }

    let referralsLength = 0;
    if (this.formGroup.value.referralControls !== undefined) {
      referralsLength = this.formGroup.value.referralControls.length;
    }

    this.userService.updateUser(param).subscribe(
      responseParent => {
        if (kidLength > 0) {
          this.userService.createKids(this.formGroup.value.kidControls).subscribe(
            responseKid => {
              if (referralsLength > 0) {
                this.userService.addFriends(this.formGroup.value.referralControls).subscribe(
                  responseReferral => {
                    this.router.navigate(['/home']);
                });
              } else {
                this.router.navigate(['/home']);
              }
          });
        } else {
          if (referralsLength > 0) {
            this.userService.addFriends(this.formGroup.value.referralControls).subscribe(
              responseReferral => {
                this.router.navigate(['/home']);
            });
          } else {
            this.router.navigate(['/home']);
          }
        }
      }, err => {
       console.log('Error in call service for parent and kid', err);
      });
      this.router.navigate(['/home']);
  }

  back() {
    this.router.navigate(['/home']);
  }

  saveUser() {
    const userReq = new UserRequest(CommonUtil.initRequestBody());
  }

  getChipColor(kid: Kid, interest: string) {
    return kid.interests.includes(interest) ? 'accent' : 'none';
  }

  toggleInterest(kid: Kid, interest: string, idx: number) {
    const interest_id = this.eventConstants.get_cat_name_by_id(interest);
    if (kid.interests.includes(interest)) {
      kid.interests.splice(kid.interests.indexOf(interest), 1);
    } else {
      kid.interests.push(interest);
    }
    this.kidControls.controls[idx].get('categories').setValue(kid.interests.toString());
  }
}
