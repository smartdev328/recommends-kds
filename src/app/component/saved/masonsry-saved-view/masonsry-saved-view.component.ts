import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { INTERFACE_ENUM, ACTION, ANALYTICS_ENTITY_TYPES_ENUM } from '@shared/constants/AnalyticsConstants';
import { ReviewsService } from '../../add-review/reviews.service';
import { API_URL } from '@shared/constants/UrlConstants';
import { VenuesService } from '../../../venue/venues/venues.service';
@Component({
  selector: 'app-masonsry-saved-view',
  templateUrl: './masonsry-saved-view.component.html',
  styleUrls: ['./masonsry-saved-view.component.css']
})
export class MasonsrySavedViewComponent implements OnInit {
  showLayout: Boolean = false;
  @Input() venues;
  @Input() start;
  @Input() end;
  @Input() type;


  constructor(private router: Router,
              private reviewService: ReviewsService,
              private venuesService: VenuesService) {
   }

  ngOnInit() {
    setTimeout(() => {
      this.showLayout = true;
    }, 1000);


  }

  save_action(id, i, type) {
    this.add_analytics_data(id, i, 'SAVE', type);
    this.venues[i].is_saved = "true";
  }
  add_analytics_data(id, i, atype: any, type) {
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
        'entity_type': type,
        'entity_id': id,
        'interface': INTERFACE_ENUM.FE,
        'action': action,
        'referrer': '/root/home'
      }]
    };
    this.reviewService.add_analytics_actions(analytics_input).subscribe(data => {
      if (atype === 'CLICK') {
        this.is_save_action(id, i, type);
      }
    }, error => {
    });

  }

  is_save_action(id, i, type) {
    this.reviewService.verify_save_action(null, type, id).subscribe(data => {
      if (data['status'] === true) {
        this.venues[i].is_saved = "true";
      } else {
        this.venues[i].is_saved = "false";
      }
    }, error => {
    });
  }

  is_delete_action(id, i , type) {
    this.reviewService.delete_action(id, type).subscribe(data => {
      if (data['status'] === true) {
        this.venues[i].is_saved = "false";
        // this.venues.splice(i,1);
      } else {
        this.venues[i].is_saved = "true";
      }
    }, error => {
    });
  }


  calendar_redirects(id, i, type) {
    this.add_analytics_data(id, i, 'CALENDAR', type);

    const calendar_url = API_URL + 'cal_redirect/?event_id=' + id;
    window.open(calendar_url);
  }

  add_subscription_venue(id, i) {
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
        this.venues[i].is_followed = "false";
      }
    }, error => {
      alert('Something went wrong while subscribe venue');
    });
  }

  unsubscribe_venue(id, i) {
    this.venuesService.remove_subscriptions(null, id).subscribe(data => {
      if (data['status'] === true) {
        this.venues[i].is_followed = "false";
        // this.venues.splice(i,1);
      } else {
        this.venues[i].is_followed = "true";
      }
    }, error => {
      console.log('Something went wrong while subscribe venue');
    });
  }

}
