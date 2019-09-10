import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.showLayout = true;
    }, 2000);
  }

  // venue_redirect(id) {
  //   this.router.navigate(['/venues', id]);
  // }
}
