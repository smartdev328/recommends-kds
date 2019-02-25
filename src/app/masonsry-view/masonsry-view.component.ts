import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-masonsry-view',
  templateUrl: './masonsry-view.component.html',
  styleUrls: ['./masonsry-view.component.css']
})
export class MasonsryViewComponent implements OnInit {
  showLayout: boolean = false;
  @Input() events;
  @Input() start;
  @Input() end;
  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.showLayout = true;
    }, 2000);
  }

  event_redirect(id) {
    this.router.navigate(['/events', id]);
  }
}
