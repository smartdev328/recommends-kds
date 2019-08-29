import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { EventConstants } from '@shared/constants/EventConstants';
import { Kid } from '@shared/model/kid';
import { UserRequest } from '@shared/model/request-body';
import { CommonUtil } from '@shared/utils/common-util';
import { UserService } from '@shared/service/user.service';
import { User } from '@shared/model/user';
import { AuthService } from '@shared/service/auth.service';

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

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      zipcode: new FormControl(),
      newsletter: new FormControl(),
      kidControls: this.formBuilder.array([])
    });
    this.interests = this.eventConstants.PRIMARY_CATEGORY.map((item) => item.name);
    //console.log('Interests ' + this.interests);
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
        this.initKidControls((user.parent && user.parent.kids) ? user.parent.kids : [new Kid()]);
      }
    });
  }

  initKidControls(kids: Kid[]) {
    this.kidControls = this.formGroup.get('kidControls') as FormArray;
    for (let i = 0; i < kids.length; i++) {
      //console.log(`Kid  Object: ${JSON.stringify(kids[i], null, 4)}`);
      this.kidControls.push(new FormGroup({
        nickname: new FormControl(kids[i].nick_name),
        age: new FormControl(kids[i].age),
        interests: new FormControl(kids[i].interests[0].freeform),
      }));
    }
  }

  addChild(kid: Kid) {
    this.user.parent.kids.push(kid);
    this.initKidControls([kid]);
  }

  save() {
    //console.log(this.formGroup);
    // Call PATCH on /parents/ and /kids/ backend APIs to update
    // information for the parent and kids.
    console.log(`Kid  Object: ${JSON.stringify(this.user, null, 4)}`);
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
