import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { VenuesService } from '../venues/venues.service';
@Component({
  selector: 'app-masonsry-venues-view',
  templateUrl: './masonsry-venues-view.component.html',
  styleUrls: ['./masonsry-venues-view.component.css']
})
export class MasonsryVenuesViewComponent implements OnInit {
  showLayout: Boolean = false;
  @Input() venues;
  @Input() start;
  @Input() end;

  constructor(private router: Router,
              private venuesService:VenuesService) { }

  ngOnInit() {
    setTimeout(() => {
      this.showLayout = true;
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
}
