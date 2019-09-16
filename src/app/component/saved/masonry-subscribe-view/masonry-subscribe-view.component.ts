import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { VenueListingService } from '../../../venue/venue-listing/venue-listing.service';
import { VenuesService } from '../../../venue/venues/venues.service';



@Component({
  selector: 'app-masonry-subscribe-view',
  templateUrl: './masonry-subscribe-view.component.html',
  styleUrls: ['./masonry-subscribe-view.component.css']
})
export class MasonrySubscribeViewComponent implements OnInit {
  showLayout: Boolean = false;
  @Input() venues: Array<any>;
  @Input() start;
  @Input() end;
  @Input() type;
  isSubscribeVisible:Boolean =true;
  errorMessage:any;


  constructor(private router: Router,
              private venuesService: VenuesService) { }

  ngOnInit() {
    

    setTimeout(() => {
      this.showLayout = true;
    }, 1000);


  }

  add_subscription_venue(id,i) {
      const input_data = {
        "venue_subs_data": {
          "venue_id": id,
        }
      };
      this.venuesService.add_subscriptions(input_data).subscribe(data => {
        if (data['status'] === true) {
          this.venues[i].sub = 0;
          this.isSubscribeVisible = true;
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
          this.venues[i].sub = 1;
          this.isSubscribeVisible = false;          
        }
      }, error => {
        this.errorMessage = 'Something went wrong while subscribe venue';
      });
  }
}
