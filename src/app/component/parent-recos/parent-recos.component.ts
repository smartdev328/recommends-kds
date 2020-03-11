import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/service/auth.service';
import { AirtableService } from '@shared/service/airtable.service';

@Component({
    selector: 'app-parent-recos',
    templateUrl: './parent-recos.component.html',
    styleUrls: ['./parent-recos.component.css']
})
export class ParentRecosComponent implements OnInit {
  recommender: string;
  recommenderName: string;
  public all_recos: any;
  isAuthenticated$: Observable < boolean > ;
  isLoggedin: boolean;
  start = 0;
  end = 21;

  constructor(private route: ActivatedRoute,
    private airtableService: AirtableService,
    private titleService: Title,
    private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.isAuthenticated$.subscribe(data => {
      this.isLoggedin = data;
    });
  }

  ngOnInit() {
    this.all_recos = {
      'eventsandexperiences': [],
      'classes': [],
      'camps': [],
      'appsandgames': [],
      'places': [],
      'books': [],
      'products': [],
      'services': [],
      'toys': [],
      'movies': []
    };
    this.isAuthenticated$.subscribe(data => {
      this.isLoggedin = data;
      this.authService.setAuth(this.isLoggedin);
      this.get_recos();
    });
    if (this.isLoggedin == false) {
      this.authService.login();
    }
    this.titleService.setTitle('Recommendations');
    this.recommender = atob(this.route.snapshot.params['recommender']);
    this.recommenderName = this.recommender.split("-")[0];
  }

  get_recos() {
    this.airtableService.getRecos(this.recommenderName).subscribe(data => {
      for (let idx in data['records']) {
        let rec = data['records'][idx];
        if (rec.fields.Category[0] === "Class") {
          this.all_recos.classes.push(rec);
        } else if (rec.fields.Category[0] === "Event & Experience") {
          this.all_recos.eventsandexperiences.push(rec);
        } else if (rec.fields.Category[0] === "Camp") {
          this.all_recos.camps.push(rec);
        } else if (rec.fields.Category[0] === "App & Game") {
          this.all_recos.appsandgames.push(rec);
        } else if (rec.fields.Category[0] === "Place") {
          this.all_recos.places.push(rec);
        } else if (rec.fields.Category[0] === "Product") {
          this.all_recos.products.push(rec);
        } else if (rec.fields.Category[0] === "Service") {
          this.all_recos.services.push(rec);
        } else if (rec.fields.Category[0] === "Toy") {
          this.all_recos.toys.push(rec);
        } else if (rec.fields.Category[0] === "Movie & TV") {
          this.all_recos.movies.push(rec);
        } else if (rec.fields.Category[0] === "Book") {
          this.all_recos.books.push(rec);
        }
      }
    });
  }
}
