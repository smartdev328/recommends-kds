import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { EventConstants } from '@shared/constants/EventConstants';
import { Kid } from '@shared/model/kid';
import { UserRequest } from '@shared/model/request-body';
import { CommonUtil } from '@shared/utils/common-util';
import { UserService } from '@shared/service/user.service';
import { User } from '@shared/model/user';
import { AuthService } from '@shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formGroup: FormGroup;
  interests: string[];
  kidControls: FormArray;
  user: User;
  eventConstants = new EventConstants();
  parentEmail: string;
  newsletter: boolean = false;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public auth: AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      kid_id: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      zipcode: new FormControl(),
      newsletter: new FormControl(Boolean),
      kidControls: this.formBuilder.array([])
    });
    this.interests = this.eventConstants.PRIMARY_CATEGORY.map((item) => item.name);
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      if (user.parent) {
        this.formGroup.get('firstName').setValue(user.parent.first_name);
        this.formGroup.get('lastName').setValue(user.parent.last_name);
        this.formGroup.get('zipcode').setValue(user.parent.zip_code);
        this.formGroup.get('newsletter').setValue(user.parent.newsletter);
        this.formGroup.get('email').setValue(user.parent.email);
        this.parentEmail=user.parent.email;
        this.initKidControls((user.parent && user.parent.kids) ? user.parent.kids : [new Kid()]);
      }
    });
  }

  initKidControls(kids: Kid[]) {
    this.kidControls = this.formGroup.get('kidControls') as FormArray;
    for (let i = 0; i < kids.length; i++) {
      this.kidControls.push(new FormGroup({
        kid_id: new FormControl(kids[i].kid_id),
        nickname: new FormControl(kids[i].nick_name),
        age: new FormControl(kids[i].age),
        interests: new FormControl(kids[i].interests[0] && kids[i].interests[0].freeform ? kids[i].interests[0].freeform : ''),
      }));
    }
  }

  addChild() {
    const kid = [new Kid()]
    this.user.parent.kids.push();
    // this.kids.push(new Kid());
    // this.kidControls = this.formGroup.get('kidControls') as FormArray;
    // this.kidControls.push(new FormGroup({
    //   nick_name: new FormControl(),
    //   age: new FormControl(),
    //   interests: new FormControl(),
    //   categories: new FormControl()
    // }));
    this.initKidControls(kid);
  }

  save() {
    this.formGroup.value.newsletter = false;
    let param = {
      first_name: this.formGroup.value.firstName,
      last_name: this.formGroup.value.lastName,
      zip_code: this.formGroup.value.zipcode,
      email: this.parentEmail,
      newsletter: this.formGroup.value.newsletter.toString,
    }
    const kidLength=this.formGroup.value.kidControls.length;
    const kidParam = this.formGroup.value.kidControls;
    this.userService.updateUser(param).subscribe(
      responseParent => {
        for(let i=0;i<kidLength;i++){
          // this.userService.updateKids(kidParam[i]).subscribe(
          //   responseKid => {
          //     if(i === kidLength-1){
          //       this.router.navigate(['/home']);
          //     }
          //   });
        }
      }, err => {
        console.log('Error in call service for parent and kid', err);
      });
    // Call PATCH on /parents/ and /kids/ backend APIs to update
    // information for the parent and kids.
   
  }

  saveUser() {
    const userReq = new UserRequest(CommonUtil.initRequestBody());

  }

  getChipColor(kid: Kid, interest: string) {
    //console.log(`Kid  Object: ${JSON.stringify(kid, null, 4)}`);
    if (kid.interests.length > 0) {
      const kid_interests = kid.interests[0].interests.split(',');
      const cat_id = this.eventConstants.get_cat_id_by_name(interest);
      return kid_interests.includes(cat_id) ? 'accent' : 'none';
    }
  }

  toggleInterest(kid: Kid, interest: string) {
    const kid_interests = kid.interests[0].interests.split(',');
    const cat_id = this.eventConstants.get_cat_id_by_name(interest);
    if (kid_interests.includes(cat_id)) {
      kid_interests.splice(kid_interests.indexOf(cat_id), 1);
    } else {
      kid_interests.push(cat_id);
    }
    kid.interests[0].interests = kid_interests.toString();
  }

}
