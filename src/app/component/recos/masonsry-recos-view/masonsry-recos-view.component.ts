import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { INTERFACE_ENUM, ACTION, ANALYTICS_ENTITY_TYPES_ENUM } from '@shared/constants/AnalyticsConstants';
import { ReviewsService } from '../../add-review/reviews.service';
import { API_URL } from '@shared/constants/UrlConstants';
import { VenuesService } from '../../../venue/venues/venues.service';
import { delay } from 'q';
@Component({
  selector: 'app-masonsry-recos-view',
  templateUrl: './masonsry-recos-view.component.html',
  styleUrls: ['./masonsry-recos-view.component.css']
})
export class MasonsryRecosViewComponent implements OnInit {
  showLayout: Boolean = false;
  showFriends: Boolean = false;
  
  @Input() recos;
  @Input() start;
  @Input() end;
  @Input() type;
  @Input() delay;
  @Input() friends_reco;
  @Input() community_reco;
  @Input() trusted_reco;
  constructor(private router: Router,
    private reviewService : ReviewsService,
    private venuesService : VenuesService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.showLayout = true;
    }, parseInt(this.delay));
  }

  recos_redirect(url) {
    window.open(url);
  }

}
