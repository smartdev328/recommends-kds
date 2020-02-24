import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Masonry } from 'ng-masonry-grid';

@Component({
  selector: 'app-masonry-parent-recos-view',
  templateUrl: './masonry-parent-recos-view.component.html',
  styleUrls: ['./masonry-parent-recos-view.component.css']
})
export class MasonryParentRecosViewComponent implements OnInit {
  showLayout = false;
  appsandgames = false;
  books = false;
  camps = false;
  classes = false;
  eventsandexperiences = false;
  movies = false;
  places = false;
  products = false;
  services = false;
  toys = false;
  Object = Object;

  @Input() recos;
  @Input() start;
  @Input() end;
  @Input() parent_id;
  _masonry: Masonry;
  masonryItems: any[];
  constructor(private router: Router) {
    
  }

  ngOnInit() {
    
    setTimeout(() => {
      this.showLayout = true;
    }, 1000);

    setTimeout(() => {
      this.appsandgames =  this.recos['appsandgames'] && this.recos['appsandgames'][0];
    }, 2000);

    setTimeout(() => {
      this.books = this.recos['books'] && this.recos['books'][0];
    }, 3000);

    setTimeout(() => {
      this.camps = this.recos['camps'] && this.recos['camps'][0];
    }, 4000);

    setTimeout(() => {
      this.classes = this.recos['classes'] && this.recos['classes'][0];
    }, 5000);

    setTimeout(() => {
        this.eventsandexperiences =  this.recos['eventsandexperiences'] && this.recos['eventsandexperiences'][0];
    }, 6000);

    setTimeout(() => {
      this.movies = this.recos['movies'] && this.recos['movies'][0];
    }, 7000);

    setTimeout(() => {
      this.places = this.recos['places'] && this.recos['places'][0];
    }, 8000);

    setTimeout(() => {
      this.products = this.recos['products'] && this.recos['products'][0];
    }, 9000);

    setTimeout(() => {
      this.services = this.recos['services'] && this.recos['services'][0];
    }, 10000);

    setTimeout(() => {
      this.toys = this.recos['toys'] && this.recos['toys'][0];
    }, 11000);
    
  }

  recos_redirect(url) {
    this.router.navigate([url]);
  }

  appendItems() {
    if (this._masonry) { // Check if Masonry instance exists
      this._masonry.setAddStatus('append'); // set status to 'append'
      this.masonryItems.push(this.recos); // some grid items: items
    }
  }
}
