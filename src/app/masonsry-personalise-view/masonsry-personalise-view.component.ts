import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Masonry } from 'ng-masonry-grid';
@Component({
  selector: 'app-masonsry-personalise-view',
  templateUrl: './masonsry-personalise-view.component.html',
  styleUrls: ['./masonsry-personalise-view.component.css']
})
export class MasonsryVenuesPersonaliseViewComponent implements OnInit {
  showLayout: boolean = false;
  popular_events: boolean = false;
  weekend_events: boolean = false;
  closest_events: boolean = false;
  favorite_events: boolean = false;

  @Input() events;
  @Input() start;
  @Input() end;
  _masonry: Masonry;
masonryItems: any[];
  constructor(private router: Router) { 
   
  }

  ngOnInit() {
    setTimeout(() => {
      this.showLayout = true;
    }, 2000);

    setTimeout(() => {
      this.favorite_events =  this.events['favourite'][0].length > 0 ? true : false;
    }, 3000);

    setTimeout(() => {
      this.popular_events = this.events['popular'][0].length > 0 ? true : false;
    }, 4000);

    setTimeout(() => {
      this.weekend_events = this.events['weekend'][0].length > 0 ? true : false;
    }, 5000);

    setTimeout(() => {
      this.closest_events = this.events['closest'][0].length > 0 ? true : false;
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
