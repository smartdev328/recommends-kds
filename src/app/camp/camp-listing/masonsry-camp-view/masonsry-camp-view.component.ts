import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ACTION, ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM } from '../../../shared/constants/AnalyticsConstants';
import { ReviewsService } from '../../../component/add-review/reviews.service';
import { AuthService } from '@shared/service/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-masonsry-camp-view',
  templateUrl: './masonsry-camp-view.component.html',
  styleUrls: ['./masonsry-camp-view.component.css']
})
export class MasonsryCampViewComponent implements OnInit {

  showLayout = false;
  @Input() camps;
  @Input() start;
  @Input() end;
  isLogedin = false;
  public isAuthenticated$: Observable<boolean>;



  constructor(private router: Router,
              private reviewService : ReviewsService,
               private authService: AuthService ) {
                this.isAuthenticated$ = this.authService.isAuthenticated$;
                this.isAuthenticated$.subscribe(data => {
                  this.isLogedin = data;
                })
               }

  ngOnInit() {
    setTimeout(() => {
      this.showLayout = true;
    }, 2000);
  }

  camp_redirect(id) {
    this.router.navigate(['/camps', id]);
  }

  save_camp(id, i) {
    //if (this.parent_id !== undefined) {
    this.add_analytics_data(id,i,'SAVE');
    this.camps[i].is_saved = "true";
    // }
  }
  add_analytics_data(id,i,atype: any) {
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
    // if (this.parent_id !== undefined) {
    analytics_input = {
      'input_data': [{
        'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.CAMP,
        'entity_id': id,
        'interface': INTERFACE_ENUM.FE,
        //'parent_id': this.parent_id,
        'action': action,
        'referrer': '/root/home'
      }]
      // };
    }
    //  else {
    //   analytics_input = {
    //     'input_data': [{
    //       'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.CAMP,
    //       'entity_id': this.camp_id,
    //       'interface': INTERFACE_ENUM.FE,
    //       'action': action,
    //       'referrer': '/root/home'
    //     }]
    //   };
    // }
    this.reviewService.add_analytics_actions(analytics_input).subscribe(data => {
      if (atype === 'CLICK') {
        this.is_save_action(id,i);
        //this.is_parent_id = true;
      }
    }, error => {
    });

  }

  is_save_action(id,i) {
    this.reviewService.verify_save_action(null, ANALYTICS_ENTITY_TYPES_ENUM.CAMP, id).subscribe(data => {
      if (data['status'] === true) {
        this.camps[i].is_saved = "true";
      } else {
        this.camps[i].is_saved = "false";
      }
    }, error => {
    });
  }
}
