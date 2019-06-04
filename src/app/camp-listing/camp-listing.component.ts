import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { UrlConstants } from '../constants/UrlConstants';
import { ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION } from '../constants/AnalyticsConstants';
import { ReviewsService } from '../add-review/reviews.service';
import { CampConstants, CampErrorMessage } from '../constants/CampConstants';
import { EventConstants } from '../constants/EventConstants';
import { ErrorMessage } from '../constants/CommonConstants';
import {CampListingService} from './camp-listing.service'
import { unescapeIdentifier } from '@angular/compiler';
declare let ga: any;
@Component({
  selector: 'app-camp-listing',
  templateUrl: './camp-listing.component.html',
  styleUrls: ['./camp-listing.component.css']
})
export class CampListingComponent implements OnInit {
  public selected_cat : String;
  public category_label : String;
  public keyword : String;
  public campConstatnt = new CampConstants();
  public categoryList = this.campConstatnt.CAMP_CATEGORY;
  public oldCat : String;
  public isErrorVisible: Boolean;
  public isFilterErrorVisible: Boolean;
  public errorMessage: String;
  public filterErrorMessage: String;
  camp_explore;
  isExplore: Boolean;
  public category: String;
  public URLConstatnts = new UrlConstants();
  public campErrorMessage = new CampErrorMessage();
  public commonErrorMessage = new ErrorMessage();
  showMore: Boolean = false;
  start: any = 0;
  end: any = 20;
  oldCat_1 = true;
  oldCat_2 = false;
  // public campConstants :any;

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router,
    private titleService: Title, private reviewService: ReviewsService,
    private campListingService : CampListingService
    ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
    this.isExplore = false;
    this.selected_cat = '';
    this.keyword = '';
    this.category_label = 'Category';
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.category = params['category'];
        this.keyword = params['q'];
        this.get_camps_details();
      });
    this.titleService.setTitle('Camps');
    this.isErrorVisible = false;
    this.errorMessage = '';
    this.isFilterErrorVisible = false;
    this.filterErrorMessage = '';

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
      url = this.URLConstatnts.API_URL + 'camps/?limit=50&q=' + this.keyword.trim();
    } else if(this.category !== '' && this.category !== undefined) {
      url = this.URLConstatnts.API_URL + 'camps/?limit=80&category=' + this.category.trim();
    } else {
      url = this.URLConstatnts.API_URL + 'camps/?limit=50';
    }
    this.camp_explore = '';
    this.isExplore = true;
    this.showMore = false;
    const headers = new HttpHeaders();
    this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
      data = data.replace(/\n/g, '');
      data = JSON.parse(data);
      if (data['data'] != undefined && data['data'].length>0) { 
        this.camp_explore = data['data'];
      } else {
        alert('No data found');
        this.camp_explore = [];
      }
      this.isExplore = false;
      if (this.camp_explore.length > this.end) {
        this.showMore = true;
      }
    });

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

  onCategoryChange(current_cat_obj : Object) {
    this.oldCat = this.selected_cat; 
    this.selected_cat = current_cat_obj['name'];
    this.category_label = this.selected_cat;
  }

  clear_filter_data() {
        this.selected_cat = '';
        this.category_label = 'None';
        this.keyword = '';
        this.isFilterErrorVisible = false;
        this.isErrorVisible = false;
        this.errorMessage = '';
        this.filterErrorMessage = '';
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
        url = this.URLConstatnts.API_URL + 'camps/?limit=80&q=' + this.keyword.trim() + '&category=' + this.category.trim();
      }
      else if ((this.category === undefined || this.category === '') && this.keyword !== undefined && this.keyword !== '') {
        url = this.URLConstatnts.API_URL + 'camps/?limit=80&q=' + this.keyword.trim();
      } else if (this.category !== '' && this.category !== undefined){
        url = this.URLConstatnts.API_URL + 'camps/?limit=80&category=' + this.category.trim();
      }
      this.camp_explore = [];
      this.showMore = false;
      this.isExplore = true;
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
      });
    }
  }

}
