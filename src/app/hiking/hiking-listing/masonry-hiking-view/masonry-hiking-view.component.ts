import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-masonsry-hiking-view',
  templateUrl: './masonry-hiking-view.component.html',
  styleUrls: ['./masonry-hiking-view.component.css']
})

export class MasonsryHikingTrailViewComponent implements OnInit {

  showLayout = false;
  @Input() trails: any;
  @Input() start: any;
  @Input() end: any;

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.showLayout = true;
    }, 2000);
  }

  hiking_trail_redirect(id) {
    this.router.navigate(['/hiking-trails', id]);
  }
}
