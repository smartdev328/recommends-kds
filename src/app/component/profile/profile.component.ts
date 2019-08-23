import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { EventConstants } from '@shared/constants/EventConstants';
import { Kid } from '@shared/model/kid';
import { Item } from '@shared/model';
import { UserRequest } from '@shared/model/request-body';
import { CommonUtil } from '@shared/utils/common-util';
import { UserService } from '@shared/service/user.service';
import { User } from '@shared/model/user';

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

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      zipcode: new FormControl(),
      kidControls: this.formBuilder.array([])
    });
    this.interests = new EventConstants().PRIMARY_CATEGORY.map((item) => item.name);
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.initKidControls((user.parent && user.parent.kids) ? user.parent.kids : [new Kid()]);
    });
  }

  initKidControls(kids: Kid[]) {
    this.kidControls = this.formGroup.get('kidControls') as FormArray;
    for (let i = 0; i < kids.length; i++) {
      this.kidControls.push(new FormGroup({
        nickname: new FormControl(kids[i].nick_name),
        age: new FormControl(kids[i].age),
        // interests: new FormControl(kids[i].interests)
        interests: new FormControl()
      }));
    }
  }

  addChild(kid: Kid) {
    this.user.parent.kids.push(kid);
    this.initKidControls([kid]);
  }

  save() {
    console.log(this.formGroup);
  }

  saveUser() {
    const userReq = new UserRequest(CommonUtil.initRequestBody());

  }

  getChipColor(kid: Kid, interest: string) {
    return kid.interests.includes(interest) ? 'accent' : 'none';
  }

  toggleInterest(kid: Kid, interest: string) {
    if (kid.interests.includes(interest)) {
      kid.interests.splice(kid.interests.indexOf(interest), 1);
    } else {
      kid.interests.push(interest);
    }
  }

}
