import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.showLayout = true;
    }, 2000);
  }

  venue_redirect(id) {
    this.router.navigate(['/venues', id]);
  }
}
