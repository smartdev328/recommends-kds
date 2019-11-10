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
import { log } from 'util';

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
  kids: Kid[];
  success: boolean;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public auth: AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.kids =[];
    this.formGroup = new FormGroup({
      kid_id: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl({disabled: true}),
      zipcode: new FormControl(),
      newsletter: new FormControl(),
      kidControls: this.formBuilder.array([])
    });
    this.interests = this.eventConstants.PRIMARY_CATEGORY.map((item) => item.name);
    this.getUser();
    this.formGroup.controls['email'].disable();
    this.success = false;

  }

  getUser() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      let isNewsLetter = false;
      if(user.parent.newsletter.toString() == 'True'){
        isNewsLetter = true;
      }
      if (user.parent) {
        this.formGroup.get('firstName').setValue(user.parent.first_name);
        this.formGroup.get('lastName').setValue(user.parent.last_name);
        this.formGroup.get('zipcode').setValue(user.parent.zip_code);
        this.formGroup.get('newsletter').setValue(isNewsLetter);
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
        nick_name: new FormControl(kids[i].nick_name),
        age: new FormControl(kids[i].age),
        interests: new FormControl(kids[i].interests[0] && kids[i].interests[0].freeform ? kids[i].interests[0].freeform : ''),
        categories: new FormControl(kids[i].interests[0] && kids[i].interests[0].interests ? kids[i].interests[0].interests : '')
      }));
    }
  }
 
  addChild() {
    const kid = [new Kid()]
    this.user.parent.kids.push(new Kid());
    this.kids.push(new Kid());
    this.initKidControls(kid);
  }

  removechild(i){
    this.kidControls.removeAt(i);
    this.kids.splice(i,1);
    this.user.parent.kids.splice(i,1);

  }

  save() {
    let param = {
      first_name: this.formGroup.value.firstName,
      last_name: this.formGroup.value.lastName,
      zip_code: this.formGroup.value.zipcode,
      email: this.parentEmail,
      newsletter: this.formGroup.value.newsletter,
    }
    var kidLength = 0;
    if (this.formGroup.value.kidControls !== undefined) {
      kidLength = this.formGroup.value.kidControls.length;
    }
    var kidsToUpdate = [];
    var kidsToCreate = [];
    for(let i=0;i<kidLength;i++){
      if(this.formGroup.value.kidControls[i].kid_id !== null) {
        kidsToUpdate.push(this.formGroup.value.kidControls[i]);
      } else {
        kidsToCreate.push(this.formGroup.value.kidControls[i]);
      }
    }
    this.userService.updateUser(param).subscribe(
      responseParent => {
        if (kidsToCreate.length > 0) {
          this.userService.createKids(kidsToCreate).subscribe(
            responsecreateKid => {
              //console.log('created kids');
              if (kidsToUpdate.length > 0) {
                this.userService.updateAllKids(kidsToUpdate).subscribe(
                  responsecreateKid => {
                    //console.log('created updated kids');
                    this.router.navigate(['/home']);
                  },errCreateKid => {
                    this.setSuccess(false);
                  });
              } else {
                this.router.navigate(['/home']);
              }
              this.setSuccess(true);
            },errCreateKid => {
              this.setSuccess(false);
            });
        }
        if (kidsToUpdate.length > 0) {
          this.userService.updateAllKids(kidsToUpdate).subscribe(
            responsecreateKid => {
              //console.log('just updated kids');
              this.router.navigate(['/home']);
            },errCreateKid => {
              this.setSuccess(false);
            });
        }
        this.router.navigate(['/home']);
      }, err => {
        this.setSuccess(false);
      }
    );
  }

  setSuccess(value: boolean) {
    this.success = value;
  }

  saveUser() {
    const userReq = new UserRequest(CommonUtil.initRequestBody());

  }

  getChipColor(kid: Kid, interest: string) {
    const cat_id = this.eventConstants.get_cat_id_by_name(interest);
    if (kid.interests.length > 0 && kid.interests[0].interests) {
      const kid_interests = kid.interests[0].interests.split(',');
      return kid_interests.includes(cat_id) ? 'accent' : 'none';
    }
    else{
      return kid.interests.includes(cat_id) ? 'accent' : 'none';
    }

  }

  toggleInterest(kid: Kid, interest: string, idx: number) {
    const cat_id = this.eventConstants.get_cat_id_by_name(interest);
    if (kid.interests.length > 0 && kid.interests[0].interests) {
      const kid_interests = kid.interests[0].interests.split(',');
      if (kid_interests.includes(cat_id)) {
        kid_interests.splice(kid_interests.indexOf(cat_id), 1);
      } else {
        kid_interests.push(cat_id);
      }
      kid.interests[0].interests = kid_interests.toString();
      this.kidControls.controls[idx].get('categories').setValue(kid.interests[0].interests);
    } else{
        if(kid.interests.length == 0){
          kid.interests.push({"interests":""})
        }
        const kid_interests = kid.interests[0].interests.split(',');
        if (kid_interests.includes(cat_id)) {
          kid_interests.splice(kid_interests.indexOf(cat_id), 1);
        } else {
          kid_interests[0] = cat_id
        }
        kid.interests[0].interests = kid_interests.toString();
        this.kidControls.controls[idx].get('categories').setValue(kid.interests[0].interests);
    }
    
  }

}
