import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
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

export class HomeComponent implements AfterViewInit, OnInit  {
  isLogedin: boolean;
  registerForm: FormGroup;
  childForm: FormGroup;
  submitted = false;
  benefitsCarouselLoaded: boolean;
  public isSuccessVisible: Boolean;
  public isAuthenticated$: Observable<boolean>;
  public topRecommendations: Recommendation[] = [];
  benefits = [
    'Discover your kid’s next favorite place, class, camp, book & more',
    'Trusted recommendations from parents like you',
    'Connect with friends & community and share the things you love'
  ];
  discoverWays = [
    {
      url: ['/', 'family-friendly-events-near-me'],
      className: 'eventsImage',
      label: 'Events'
    },
    {
      url: ['/', 'family-friendly-places-near-me'],
      className: 'placesImage',
      label: 'Places'
    },
    {
      url: ['/', 'kids-classes-near-me'],
      className: 'classesImage',
      label: 'Classes'
    },
    {
      url: ['/', 'camps-near-me'],
      className: 'campsImage',
      label: 'Camps'
    },
    {
      url: ['/', 'family-friendly-hikes-near-me'],
      className: 'hikingImage',
      label: 'Hiking'
    },
  ];
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,
    dots: false,
    arrows: false,
    speed: 300,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          infinite: true,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          infinite: true,
        }
      }
    ]
  };
  slideConfig2 = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true
        }
      }
    ]
  };
  slideConfig3 = {
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,
    dots: true,
    arrows: true,
    speed: 300,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          infinite: true,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          infinite: true,
          arrows: false,
        }
      }
    ]
  };

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

  }

  ngAfterViewInit() {
    this.airtableService.getTopRecos().subscribe(
      (data: any) => {
        this.topRecommendations = data.records;
      }
    );
  }

}
