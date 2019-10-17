import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ACTION, ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM } from '../../constants/AnalyticsConstants';
import { ReviewsService } from '../../../component/add-review/reviews.service';
import { AuthService } from '@shared/service/auth.service';
import { Observable } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { MatDialog } from '@angular/material';
import { VenuesService } from '../../../venue/venues/venues.service';
import { API_URL } from '@shared/constants/UrlConstants';
declare let ga: any;


@Component({
  selector: 'app-masonsry-view',
  templateUrl: './masonsry-view.component.html',
  styleUrls: ['./masonsry-view.component.css']
})
export class MasonsryViewComponent implements OnInit {
  currentUrl: string;
  @ViewChild('deleteuser') deleteuser: TemplateRef<any>
  isLogedin = false;
  public isAuthenticated$: Observable<boolean>;
  dialogRef: any;
  modalRef: BsModalRef;
  ClickName: any;
  saveEvent = "save this camp";
  showLayout: Boolean = false;
  @Input() events;
  @Input() start;
  @Input() end;
  @Input() type;

  constructor(private router: Router,
    private venuesService: VenuesService,
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
  save_camp(id, i) {
    this.add_analytics_data(id, i, 'SAVE');
    this.events[i].is_saved = "true";
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
        'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.EVENT,
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
      console.log(error);
    });
  }

  is_save_action(id, i) {
    this.reviewService.verify_save_action(null, ANALYTICS_ENTITY_TYPES_ENUM.EVENT, id).subscribe(data => {
      if (data['status'] === true) {
        this.events[i].is_saved = "true";
      } else {
        this.events[i].is_saved = "false";
      }
    }, error => {
    });
  }

  is_delete_action(id, i) {
    this.reviewService.delete_action(id, ANALYTICS_ENTITY_TYPES_ENUM.EVENT).subscribe(data => {
      if (data['status'] === true) {
        this.events[i].is_saved = "false";
      } else {
        this.events[i].is_saved = "true";
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

  calendar_redirects(id,i) {
    this.add_analytics_data(id,i,'CALENDAR');

    const calendar_url = API_URL + 'cal_redirect/?event_id=' + id;
    window.open(calendar_url);
  }
}
