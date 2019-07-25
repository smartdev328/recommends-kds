import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-masonsry-camp-view',
  templateUrl: './masonsry-camp-view.component.html',
  styleUrls: ['./masonsry-camp-view.component.css']
})
export class MasonsryCampViewComponent implements OnInit {

  showLayout = false;
  @Input() camps;
  @Input() start;
  @Input() end;

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.showLayout = true;
    }, 2000);
  }

  camp_redirect(id) {
    this.router.navigate(['/camps', id]);
  }
}
