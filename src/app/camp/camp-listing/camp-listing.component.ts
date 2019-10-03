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
import { CampListingService } from './camp-listing.service';
import { AuthService } from '@shared/service/auth.service';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog, } from "@angular/material";
//const API_URL = 'https://kin-api-dev.kinparenting.com/';

declare let ga: any;
@Component({
  selector: 'app-camp-listing',
  templateUrl: './camp-listing.component.html',
  styleUrls: ['./camp-listing.component.css']
})
export class CampListingComponent implements OnInit {
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
  camp_explore;
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
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        this.currentUrl = event.urlAfterRedirects;
        ga('send', 'pageview');
      }
    });
    this.isExplore = false;
    this.selected_cat = '';
    this.keyword = '';
    this.category_label = 'Category';
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.isAuthenticated$.subscribe(data => {
      this.isLogedin = data;
    })
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.category = params['category'];
        this.keyword = params['q'];
        this.get_camps_details();
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

  }
  loadMore() {

    if (this.camp_explore.length > this.end) {
      this.end = this.end + 20;
    }
    if (this.camp_explore.length < this.end) {
      this.showMore = false;
    }

  }
  get_camps_details() {
    let url = '';
    if (this.keyword !== '' && this.keyword !== undefined) {
      url = API_URL + 'camps/?limit=50&q=' + this.keyword.trim();
    } else if (this.category !== '' && this.category !== undefined) {
      url = API_URL + 'camps/?limit=80&category=' + this.category.trim();
    } else {
      url = API_URL + 'camps/?limit=50';
    }
    this.camp_explore = '';
    this.isExplore = true;
    this.showMore = false;

    if (this.isLogedin == true) {
      this.campsListingService.get_camp_details(url).subscribe(data => {
        if (data['data'] != undefined && data['data'].length > 0) {
          this.camp_explore = data['data'];
        } else {
          alert('No data found');
          this.camp_explore = [];
        }
        this.isExplore = false;
        if (this.camp_explore.length > this.end) {
          this.showMore = true;
        }
      })
    } else {
      const headers = new HttpHeaders();
      this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
        data = data.replace(/\n/g, '');
        data = JSON.parse(data);
        if (data['data'] != undefined && data['data'].length > 0) {
          this.camp_explore = data['data'];
        } else {
          alert('No data found');
          this.camp_explore = [];
        }
        this.isExplore = false;
        if (this.camp_explore.length > this.end) {
          this.showMore = true;
        }
      })
    }
  }

  add_analytics_data() {
    const final_data = {
      'input_data': []
    };
    const input_final_data = [];
    for (let i = 0; i < this.camp_explore.length; i++) {
      const final_key_value_pair = {
        'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.CAMP,
        'entity_id': undefined,
        'interface': INTERFACE_ENUM.FE,
        'action': ACTION.VIEW,
        'referrer': '/root/home'
      };
      final_key_value_pair['entity_id'] = this.camp_explore[i].id;
      input_final_data.push(final_key_value_pair);
    }
    final_data['input_data'] = input_final_data;
    this.reviewService.add_analytics_actions(final_data).subscribe(data => {
    }, error => {
      alert('Something went wrong');
    });

  }
  kin_redirect() {
    ga('send', 'camp', {
      eventCategory: 'Clicks',
      eventLabel: 'Kin Redirect',
      eventAction: 'Click on kin redirect button'
    });
    window.location.href = 'http://m.me/kinparenting';
  }

  onCategoryChange(current_cat_obj: Object) {
    this.oldCat = this.selected_cat;
    this.selected_cat = current_cat_obj['name'];
    this.category_label = this.selected_cat;
    this.filter_camp_data();
  }

  clear_filter_data() {
    this.selected_cat = '';
    this.category_label = 'None';
    this.keyword = '';
    this.isFilterErrorVisible = false;
    this.isErrorVisible = false;
    this.errorMessage = '';
    this.filterErrorMessage = '';
    this.ngOnInit();
  }


  filter_camp_data() {
    if ((this.selected_cat === '' && this.category === undefined)
      && (this.keyword === undefined && this.keyword === '')) {
      this.isFilterErrorVisible = true;
      this.isErrorVisible = false;
      this.errorMessage = '';
      this.filterErrorMessage = this.commonErrorMessage.SELECT_FILTER_CRITERIA;
    } else {
      this.isFilterErrorVisible = false;
      this.filterErrorMessage = '';
      let url = '';
      this.category = this.selected_cat;
      if (this.category !== '' && this.category !== undefined && this.keyword !== undefined && this.keyword !== '') {
        url = API_URL + 'camps/?limit=80&q=' + this.keyword.trim() + '&category=' + this.category.trim();
      } else if ((this.category === undefined || this.category === '') && this.keyword !== undefined && this.keyword !== '') {
        url = API_URL + 'camps/?limit=80&q=' + this.keyword.trim();
      } else if (this.category !== '' && this.category !== undefined) {
        url = API_URL + 'camps/?limit=80&category=' + this.category.trim();
      }
      this.camp_explore = [];
      this.showMore = false;
      this.isExplore = true;
      if (this.isLogedin == true) {
        this.campsListingService.get_camp_details(url).subscribe(data => {

          this.camp_explore = data['data'];
          if (data['data'] != undefined && data['data'].length > 0) {
            this.isErrorVisible = false;
            this.errorMessage = '';
            if (this.oldCat_1) {
              this.oldCat_2 = true;
              this.oldCat_1 = false;
            } else {
              this.oldCat_2 = false;
              this.oldCat_1 = true;
            }
  
          } else {
            this.isErrorVisible = true;
            this.errorMessage = this.campErrorMessage.NO_CAMPS_FOUND;
            this.camp_explore = [];
          }
          this.isExplore = false;
          if (this.camp_explore.length > this.end) {
            this.showMore = true;
          }
        }, error => {
          this.isErrorVisible = true;
          this.errorMessage = this.commonErrorMessage.SOMETHING_WENT_WRONG;
        });      
      } else {
        const headers = new HttpHeaders();
        this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
          data = data.replace(/\n/g, '');
          data = JSON.parse(data);
          this.camp_explore = data['data'];
          if (data['data'] != undefined && data['data'].length > 0) {
            this.isErrorVisible = false;
            this.errorMessage = '';
            if (this.oldCat_1) {
              this.oldCat_2 = true;
              this.oldCat_1 = false;
            } else {
              this.oldCat_2 = false;
              this.oldCat_1 = true;
            }
  
          } else {
            this.isErrorVisible = true;
            this.errorMessage = this.campErrorMessage.NO_CAMPS_FOUND;
            this.camp_explore = [];
          }
          this.isExplore = false;
          if (this.camp_explore.length > this.end) {
            this.showMore = true;
          }
        }, error => {
          this.isErrorVisible = true;
          this.errorMessage = this.commonErrorMessage.SOMETHING_WENT_WRONG;
        });        }

    }
  }

  //this function will open a popup when user is not loggen in
  checkLogin(linkName) {

    if (this.isLogedin) {
      this.loadMore();
    } else {
      this.detectClick(linkName);
    }
  }
  detectClick(moreCamps) {
    let counter = this.count++
    if (counter <= 1) {
      this.loadMore();
    } else
      this.openPopup(moreCamps);
  }
  openPopup(moreCamps) {
    this.moreCamps = moreCamps;
    this.dialogRef = this.dialog.open(this.openModal, {
      width: "626px"
    });
  }
  signin() {
    sessionStorage.setItem('current_url', JSON.stringify(this.currentUrl))
    this.authService.login();
  }
  closeDialog() {
    this.dialogRef.close();
  }


}
