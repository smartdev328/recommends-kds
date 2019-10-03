import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Masonry } from 'ng-masonry-grid';
@Component({
  selector: 'app-masonsry-personalise-view',
  templateUrl: './masonsry-personalise-view.component.html',
  styleUrls: ['./masonsry-personalise-view.component.css']
})
export class MasonsryVenuesPersonaliseViewComponent implements OnInit {
  showLayout = false;
  popular_events = false;
  weekend_events = false;
  closest_events = false;
  favorite_events = false;
  public nearby_events_query_params: Object = {};

  @Input() events;
  @Input() start;
  @Input() end;
  @Input() parent_id;
  _masonry: Masonry;
  masonryItems: any[];
  constructor(private router: Router) {


  }

  ngOnInit() {

    this.nearby_events_query_params = { distance: '20', username: this.parent_id, order_by: 'date_dist_asc' };
    setTimeout(() => {
      this.showLayout = true;
    }, 2000);

    setTimeout(() => {
      if(this.events['favourite'] && this.events['favourite'][0]){

      this.favorite_events = this.events['favourite'][0].length > 0 ? true : false;
      }
    }, 3000);

    setTimeout(() => {
      if(this.events['popular'] && this.events['popular'][0]){
        this.popular_events = this.events['popular'][0].length > 0 ? true : false;
      }
    }, 4000);

    setTimeout(() => {
      if(this.events['weekend'] && this.events['weekend'][0]){

      this.weekend_events = this.events['weekend'][0].length > 0 ? true : false;
      }
    }, 5000);

    setTimeout(() => {
      if(this.events['closest'] && this.events['closest'][0]){

      this.closest_events = this.events['closest'][0].length > 0 ? true : false;
      }
    }, 6000);


  }

  event_redirect(id) {
    this.router.navigate(['/events', id]);
  }

  appendItems() {
    if (this._masonry) { // Check if Masonry instance exists
      this._masonry.setAddStatus('append'); // set status to 'append'
      this.masonryItems.push(this.events); // some grid items: items
    }
  }
}
