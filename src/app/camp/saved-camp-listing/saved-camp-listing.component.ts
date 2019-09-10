import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ReviewsService } from '../../component/add-review/reviews.service';
import { ACTION, ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM } from '../../shared/constants/AnalyticsConstants';
import { CampConstants, CampErrorMessage } from '../../shared/constants/CampConstants';
import { ErrorMessage } from '../../shared/constants/CommonConstants';
import { API_URL } from '@shared/constants/UrlConstants';
import { CampListingService } from '../camp-listing/camp-listing.service';
import { AuthService } from '@shared/service/auth.service';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog, } from "@angular/material";

@Component({
  selector: 'app-saved-camp-listing',
  templateUrl: './saved-camp-listing.component.html',
  styleUrls: ['./saved-camp-listing.component.css']
})
export class SavedCampListingComponent implements OnInit {
  @ViewChild('openModal') openModal: TemplateRef<any>

  dialogRef: any;
  public selected_cat: String;
  public category_label: String;
  public keyword: String;
  public campConstatnt = new CampConstants();
  public categoryList = this.campConstatnt.CAMP_CATEGORY;
  public oldCat: String;
  public isErrorVisible: Boolean;
  public isFilterErrorVisible: Boolean;
  public errorMessage: String;
  public filterErrorMessage: String;

  isExplore: Boolean;
  public category: String;
  public campErrorMessage = new CampErrorMessage();
  public commonErrorMessage = new ErrorMessage();
  showMore: Boolean = false;
  start: any = 0;
  end: any = 20;
  oldCat_1 = true;
  oldCat_2 = false;
  count = 0;
  moreCamps = 'more Camps';
  // public campConstants :any;
  public isAuthenticated$: Observable<boolean>;
  isLogedin = false;
  currentUrl: string;
  camp_explore: Object;
  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    private reviewService: ReviewsService,
    private campsListingService: CampListingService,
    private authService: AuthService,
    public dialog: MatDialog,
  ) {
    this.router.events.subscribe(event => {
      // if (event instanceof NavigationEnd) {
      //   ga('set', 'page', event.urlAfterRedirects);
      //   this.currentUrl= event.urlAfterRedirects;
      //   ga('send', 'pageview');
      // }
    });
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  ngOnInit() {
    this.route
    .queryParams
    .subscribe(params => {
      this.category = params['category'];
      this.keyword = params['q'];
      this.get_Saved_Camp_Details();
    });

  this.isErrorVisible = false;
  this.errorMessage = '';
  this.isFilterErrorVisible = false;
  this.filterErrorMessage = '';

  this.titleService.setTitle('Summer camps around SF bay area');
  this.metaService.addTag({ name: 'description', content: 'Summer camps around SF bay area' });
  this.metaService.addTag({
    name: 'keywords',
    content: 'camps in SF bay area, summer camps, adventure camps, STEAM camps, winter break camps, coding camps,'
      + 'technology camps, theatre camps, sports camps, speing break camps'
  });

  // OG meta properties
  this.metaService.addTag({ property: 'og:title', content: 'Summer camps around SF bay area' });
  this.metaService.addTag({ property: 'og:image', content: 'https://kinparenting.com/assets/kin_logo.jpeg' });
  this.metaService.addTag({ property: 'og:url', content: 'https://kinparenting.com/camps-near-me' });
  this.metaService.addTag({ property: 'og:site_name', content: 'Kin Parenting' });
  this.isAuthenticated$.subscribe(data => {
    this.isLogedin = data;
  })
}
get_Saved_Camp_Details() {
     this.campsListingService.get_Saved_Camp_Details().subscribe(data => {
       this.camp_explore = data['camps'];
      // if (data['data'] != undefined && data['data']['0'].length > 0) {
      //   this.camp_explore = data["data"]['0'];
      // } else {
      //   alert('No data found');
      //   this.camp_explore = [];
      // }
      // this.isExplore = false;
      // if (this.camp_explore.length > this.end) {
      // }
    // });
  })
  }
}

