import { Component, OnInit, ɵConsole, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { EventConstants } from '@shared/constants/EventConstants';
import { Kid } from '@shared/model/kid';
import { UserRequest } from '@shared/model/request-body';
import { CommonUtil } from '@shared/utils/common-util';
import { UserService } from '@shared/service/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {
  parentEmail: any;
  formGroup: FormGroup;
  interests: any[];
  kids: Kid[];
  kidControls: FormArray;
  submitted = false;
  eventConstants = new EventConstants();

  newsletter: boolean = false;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      zipcode: new FormControl(),
      email:new FormControl(),
      newsletter: new FormControl(Boolean),
      kidControls: this.formBuilder.array([])
    });
    this.interests = this.eventConstants.PRIMARY_CATEGORY.map((item) => item);
    this.kids = [];
    this.addChild();
    this.userService.getUser().subscribe((user) => {
      this.parentEmail = user.parent.email
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
    if (this.formGroup.invalid) {
      return;
    } else {
     
    }
  }

  save() {
    this.formGroup.value.newsletter = false;
    let param = {
      first_name: this.formGroup.value.firstName,
      last_name: this.formGroup.value.lastName,
      zip_code: this.formGroup.value.zipcode,
      email: this.parentEmail,
      newsletter: this.formGroup.value.newsletter,
    }
  
    const kidLength=this.kidControls.length;
    const kidParam = this.formGroup.value.kidControls;
    this.userService.updateUser(param).subscribe(
      responseParent => {
        for(let i=0;i<kidLength;i++){
          this.userService.createKid(kidParam[i]).subscribe(
            responseKid => {
              if(i === kidLength-1){
                this.router.navigate(['/home']);
              }
            });
        }
      
      }, err => {
        console.log('Error in call service for parent and kid', err);
      });


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
