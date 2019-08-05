import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventConstants } from '@shared/constants/EventConstants';
import { Kid } from '@shared/model/kid';
import { Item } from '@shared/model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formGroup: FormGroup;
  interests: Item[];
  kids: Kid[];

  constructor() { }

  ngOnInit() {
    this.formGroup = new FormGroup({});
    this.interests = new EventConstants().PRIMARY_CATEGORY;
    this.kids = [new Kid()];
  }

  addChild() {
    this.kids.push(new Kid());
  }

  save() {

  }

  getChipColor(kid: Kid, interest: Item) {
    return kid.interests.includes(interest) ? 'accent' : 'none';
  }

  toggleInterest(kid: Kid, interest: Item) {
    if (kid.interests.includes(interest)) {
      kid.interests.splice(kid.interests.indexOf(interest), 1);
    } else {
      kid.interests.push(interest);
    }
  }

}