import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { VenuesService } from '../venues/venues.service';
import { Router, NavigationEnd } from '@angular/router';
import { ACTION, ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM } from '../../shared/constants/AnalyticsConstants';
import { ReviewsService } from '../../component/add-review/reviews.service';
import { AuthService } from '@shared/service/auth.service';
import { Observable } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { MatDialog } from '@angular/material';
declare let ga: any;

@Component({
  selector: 'app-masonsry-venues-view',
  templateUrl: './masonsry-venues-view.component.html',
  styleUrls: ['./masonsry-venues-view.component.css']
})
export class MasonsryVenuesViewComponent implements OnInit {
  currentUrl: string;
  @ViewChild('deleteuser') deleteuser: TemplateRef<any>
  isLogedin = false;
  public isAuthenticated$: Observable<boolean>;
  dialogRef: any;
  modalRef: BsModalRef;
  ClickName: any;
  showLayout: Boolean = false;
  @Input() venues;
  @Input() start;
  @Input() end;

  constructor(private router: Router,
              private venuesService:VenuesService,
              private reviewService: ReviewsService,
              private authService: AuthService,
              public dialog: MatDialog) {
              this.isAuthenticated$ = this.authService.isAuthenticated$;
              this.isAuthenticated$.subscribe(data => {
                this.isLogedin = data;
              })
              this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                  ga('set', 'page', event.urlAfterRedirects);
                  this.currentUrl = event.urlAfterRedirects;
                  ga('send', 'pageview');
                }
              });
            }

  ngOnInit() {
    setTimeout(() => {
      this.showLayout = true;
      this.currentUrl = this.router.url

    }, 2000);
  }

  venue_redirect(id) {
    this.router.navigate(['/venues', id]);
  }

  add_subscription_venue(id,i) {
    const input_data = {
      "venue_subs_data": {
        "venue_id": id,
      }
    };
    this.venuesService.add_subscriptions(input_data).subscribe(data => {
      if (data['status'] === true) {
        this.venues[i].is_followed = "true";
      } else {
        alert('Something went wrong while subscribe venue');
      }
    }, error => {
      alert('Something went wrong while subscribe venue');
    });
}

unsubscribe_venue(id,i) {
    this.venuesService.remove_subscriptions(null, id).subscribe(data => {
      if (data['status'] === true) {
        this.venues[i].is_followed = "false";
      }
    }, error => {
      console.log('Something went wrong while subscribe venue');
    });
}

save_camp(id, i) {
  this.add_analytics_data(id, i, 'SAVE');
  this.venues[i].is_saved = "true";
}
add_analytics_data(id, i, atype: any) {
  let action = '';
  switch (atype) {
    case 'CLICK':
      action = ACTION.CLICK;
      break;
    case 'SAVE':
      action = ACTION.SAVE;
      break;
    case 'CALENDAR':
      action = ACTION.CALENDAR;
      break;
  }
  let analytics_input = {};
  analytics_input = {
    'input_data': [{
      'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.VENUE,
      'entity_id': id,
      'interface': INTERFACE_ENUM.FE,
      'action': action,
      'referrer': '/root/home'
    }]
  }
  this.reviewService.add_analytics_actions(analytics_input).subscribe(data => {
    if (atype === 'CLICK') {
      this.is_save_action(id, i);
    }
  }, error => {
  });

}

is_save_action(id, i) {
  this.reviewService.verify_save_action(null, ANALYTICS_ENTITY_TYPES_ENUM.VENUE, id).subscribe(data => {
    if (data['status'] === true) {
      this.venues[i].is_saved = "true";
    } else {
      this.venues[i].is_saved = "false";
    }
  }, error => {
  });
}
is_delete_action(id, i) {
  this.reviewService.delete_action(id,ANALYTICS_ENTITY_TYPES_ENUM.VENUE).subscribe(data => {
    if (data['status'] === true) {
      this.venues[i].is_saved = "false";
    } else {
      this.venues[i].is_saved = "true";
    }
  }, error => {
  });
}

deleteUser(linkName) {
  this.ClickName = linkName;
  this.dialogRef = this.dialog.open(this.deleteuser, {
    width: "626px"
  });
}

//this function will open a popup when user is not loggen in
checklogin(id, i, linkName) {
  if (this.isLogedin) {
    this.ClickName = linkName;
    // this.save_camp(id, i);
  } else {
    this.deleteUser(linkName);
  }
}

signin() {
  sessionStorage.setItem('current_url', JSON.stringify(this.currentUrl))
  this.authService.login();
  this.closeDialog();
}

closeDialog() {
  this.dialogRef.close();
}
}



