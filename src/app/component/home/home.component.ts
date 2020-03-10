import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from '@shared/service/auth.service';
import { AirtableService } from '@shared/service/airtable.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recommendation } from '../../shared/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  isLogedin: boolean;
  registerForm: FormGroup;
  childForm: FormGroup;
  submitted = false;
  public isSuccessVisible: Boolean;
  public isAuthenticated$: Observable<boolean>;
  public topRecommendations: Recommendation[];

  constructor(
    private titleService: Title,
    private metaService: Meta,
    public auth: AuthService,
    private airtableService: AirtableService
  ) {

    this.isAuthenticated$ = this.auth.isAuthenticated$;
    this.isAuthenticated$.subscribe(data => {
      this.isLogedin = data;
      this.auth.setAuth(this.isLogedin);
    });
   }

  ngOnInit() {

    this.titleService.setTitle('Kin - discover and plan family friendly activities around SF bay area');
    this.metaService.addTag({
      name: 'description', content: 'Kin is a smart assistant for parents to discover ' +
        ' personalized information and plan family friendly experiences. Find fun kid-friendly events, places, activities, camps' +
        ' camps, hiking and more.'
    });
    this.metaService.addTag({
      name: 'keywords',
      content: 'Family friendly events, kids events, kids activities in SF bay area, weekend events in SF bay area,'
        + 'summer camps, nearby parks, attractions, stroller friendly hikes'
    });

    // OG meta properties
    this.metaService.addTag({ property: 'og:title', content: 'Kin - discover and plan family friendly activities around SF bay area' });
    this.metaService.addTag({
      property: 'og:description', content: 'Kin is a smart assistant for parents to discover ' +
        ' personalized information and plan family friendly experiences. Find fun kid-friendly events, places, activities, camps' +
        ' camps, hiking and more.'
    });
    this.metaService.addTag({ property: 'og:image', content: 'https://kinparenting.com/assets/kin_logo.jpeg' });
    this.metaService.addTag({ property: 'og:url', content: 'https://kinparenting.com' });
    this.metaService.addTag({ property: 'og:site_name', content: 'Kin Parenting' });
    this.isSuccessVisible = false;

    this.airtableService.getTopRecos().subscribe(
      (data: any) => {
        this.topRecommendations = data.records;
      }
    );
  }
}
