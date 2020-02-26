import { Component, OnInit } from '@angular/core';
import { User } from '@shared/model/user';
import { UserService } from '@shared/service/user.service';
import { AirtableService } from '@shared/service/airtable.service';

@Component({
  selector: 'app-recos',
  templateUrl: './recos.component.html',
  styleUrls: ['./recos.component.css']
})
export class RecosComponent implements OnInit {

  public user: User;
  public friends: [];

  constructor(private userService: UserService, private airtableService: AirtableService) {}
  
  ngOnInit() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.get_friends();
    });
  }

  get_friends() {
    this.airtableService.getFriends(this.user.parent.parent_id).subscribe(data => {
      if (data['records'].length > 0) {
        this.friends = data['records'][0].fields.Friends.split(",");
      } else {
        this.friends = [];
      }
    });

  }
}
