import { Component, OnInit } from '@angular/core';
import { User } from '@shared/model/user';
import { UserService } from '@shared/service/user.service';
import { AirtableService } from '@shared/service/airtable.service';
import { InviteFriendComponent } from '../invite-friend/invite-friend.component';
import { MatDialogConfig, MatDialog, } from "@angular/material";

@Component({
  selector: 'app-recos',
  templateUrl: './recos.component.html',
  styleUrls: ['./recos.component.css']
})
export class RecosComponent implements OnInit {

  public user: User;
  public friends: any[];

  constructor(private userService: UserService,
    private airtableService: AirtableService,
    public dialog: MatDialog) {
      this.friends = [];
    }

  ngOnInit() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.get_friends();
    });
  }

  get_friends() {
    this.airtableService.getFriends(this.user.parent.parent_id).subscribe(data => {
      if (data['records'].length > 0) {
        const friends_list = data['records'][0].fields.Friends.split(",");
        for (let i = 0; i < friends_list.length; i++) {
          let friend: any;
          friend['name'] = friends_list[i];
          friend['link'] = btoa(friends_list[i]);
          this.friends.push(friend);
        }
      }
    });
    this.userService.getFriends().subscribe(data => {
      if (data['friends'].length > 0) {
        for (const idx in data['friends']) {
          const friend = data['friends'][idx];
          friend.link = btoa(friend.name + '-' + friend.id);
          this.friends.push(friend);
        }
      }
    });

  }

  inviteFriends() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.position = { bottom: '0'};
    dialogConfig.data =  {};
    this.dialog.open(InviteFriendComponent, dialogConfig);
  }
}
