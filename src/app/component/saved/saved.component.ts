import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  getSavedListing(event_Type){
    this.router.navigateByUrl('/saved-listing/'+event_Type);
  }

}
