import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { EventConstants } from '@shared/constants/EventConstants';
import { Kid } from '@shared/model/kid';
import { Item } from '@shared/model';
import { UserRequest } from '@shared/model/request-body';
import { CommonUtil } from '@shared/utils/common-util';
import { UserService } from '@shared/service/user.service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {

  formGroup: FormGroup;
  interests: string[];
  kids: Kid[];
  kidControls: FormArray;
  submitted = false;
  eventConstants = new EventConstants();

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      zipcode: new FormControl(),
      kidControls: this.formBuilder.array([])
    });
    this.interests = this.eventConstants.PRIMARY_CATEGORY.map((item) => item.name);
    this.kids = [];
    this.addChild();
    this.userService.getUser().subscribe((user) => {
      console.log("user" + user);
    });
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

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formGroup.invalid) {
        return;
    } else {
      console.log(this.formGroup);
    }
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

  toggleInterest(kid: Kid, interest: string, idx: number) {
    const interest_id = this.eventConstants.get_cat_id_by_name(interest);
    if (kid.interests.includes(interest)) {
      kid.interests.splice(kid.interests.indexOf(interest), 1);
      kid.interest_categories.splice(kid.interest_categories.indexOf(interest_id), 1);
    } else {
      kid.interests.push(interest);
      kid.interest_categories.push(interest_id);
    }
    this.kidControls.controls[idx].get('categories').setValue(kid.interest_categories.toString());
  }

}
