import { Component, ViewChild, OnInit, ElementRef, TemplateRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { ReviewsService } from '../../component/add-review/reviews.service';
import { ENTITY_TYPES_ENUM, TYPES_ENUM } from '../../shared/constants/VenueConstants';
import { ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION } from '../../shared/constants/AnalyticsConstants';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CampErrorMessage, CampConstants } from '../../shared/constants/CampConstants';
import { ErrorMessage } from '../../shared/constants/CommonConstants';
import { MatTabChangeEvent, MatDialogRef, MatDialog } from '@angular/material';
import { API_URL } from '@shared/constants/UrlConstants';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/service/auth.service';

declare let ga: any;
@Component({
  selector: 'app-camps',
  templateUrl: './camps.component.html',
  styleUrls: ['./camps.component.css']
})
export class CampsComponent implements OnInit {
  @ViewChild('deleteuser') deleteuser: TemplateRef<any>

  dialogRef: any;
  modalRef: BsModalRef;
  ClickName: any;

  saveEvent = "save this camp";
  addToReview = "add a review ";
  camp_id: string;
  camp: any;
  isLoaded = false;
  public is_parent_id: boolean;
  public is_review_click: boolean;
  public isErrorVisible: boolean;
  public isSuccessVisible: boolean;
  public errorMessage: String;
  public review: string;
  public user_reviews: any;
  //public parent_id: any;
  public category: string;
  public campStatus: boolean;
  public campErrorMessage = new CampErrorMessage();
  public commonErrorMessage = new ErrorMessage();
  public campConstants: any;
  public isSaveVisible: boolean;
  public reviews_present: boolean;
  public isAuthenticated$: Observable<boolean>;
  isLogedin = false;
  selectedIndex;

  @ViewChild('reviewsInput')
  reviewsInput: ElementRef;
  class: any = false;
  currentUrl: string;
  constructor(private route: ActivatedRoute, private http: HttpClient, private titleService: Title,
    private metaService: Meta, private authService: AuthService,private router:Router, private reviewService: ReviewsService, public dialog: MatDialog) 
    { 
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          ga('set', 'page', event.urlAfterRedirects);
          this.currentUrl= event.urlAfterRedirects;
          ga('send', 'pageview');
        }
      });
    }

  ngOnInit() {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.isAuthenticated$.subscribe(data => {
      this.isLogedin = data;
      this.authService.setAuth(this.isLogedin);
    })
    // this.is_parent_id = false;
    //  this.parent_id = '';
    this.camp_id = this.route.snapshot.params['id'];
    // this.parent_id = this.route.snapshot.queryParams['parent_id'];
    //this.is_parent_id = this.parent_id !== undefined && this.parent_id !== '';
    this.is_save_action();
    this.get_camp_details();
    this.is_review_click = false;
    this.isErrorVisible = false;
    this.isSuccessVisible = false;
    this.errorMessage = '';
    this.review = '';
    this.camp = [];
    this.user_reviews = [];
    this.reviews_present = false;
    this.category = '';
    this.camp.name = '';
    this.camp.image_url = '';
    this.category = '';
    this.campStatus = false;
    this.campConstants = new CampConstants();
    this.selectedIndex = 0;
    this.isSaveVisible = false;
    this.get_reviews();
    this.add_analytics_data('CLICK');

  }
  get_camp_details() {
    const url = API_URL + 'camps/' + this.camp_id + "/";

    const headers = new HttpHeaders();
    this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
      data = data.replace(/\n/g, "");
      data = JSON.parse(data);
      if (data['status']) {
        this.campStatus = true;
        this.camp = data["data"]['0'];
        if (this.camp.category !== undefined && this.camp.category > 0) {

          this.category = this.campConstants.CAMP_CATEGORY.find(x => x.id == this.camp.category).name;
        } else {
          this.category = 'No information available for now';
        }
        this.camp.lunch = this.camp.misc['lunch'];
        this.camp.tips = this.camp.misc['tips'];
        this.camp.am_extended_care = this.camp.misc['am_extended_care'];
        this.camp.pm_extended_care = this.camp.misc['pm_extended_care'];
        this.camp.image_url = this.camp.image_url;
        this.camp.timings = this.camp.misc['timings'];
        this.isLoaded = true;
        this.titleService.setTitle(this.camp.name);
        this.metaService.addTag({ name: 'description', content: this.camp.description });

        // OG meta properties
        this.metaService.addTag({ property: 'og:title', content: this.camp.name });
        this.metaService.addTag({ property: 'og:description', content: this.camp.description });
        this.metaService.addTag({ property: 'og:image', content: this.camp.image_url });
        this.metaService.addTag({ property: 'og:url', content: 'https://kinparenting.com/camps/' + this.camp_id });
        this.metaService.addTag({ property: 'og:site_name', content: 'Kin Parenting' });
      } else {
        alert('No camp information available for now');
      }
    });

  }
  show_reviews(event: MatTabChangeEvent) {

    const index = event.index;
    if (index === 1 && this.user_reviews.length === 0) {
      this.reviewService.get_reviews_by_type(TYPES_ENUM.CAMP, true, this.camp_id).subscribe(data => {
        if (data['status']) {
          this.user_reviews = data['data'];
          this.reviews_present = true;
        } else {
          this.user_reviews = [];
          this.reviews_present = false;
        }
      }, error => {
        // alert(this.campErrorMessage.GET_DATA_ERROR);
      });
    }
  }

  camp_redirect() {
    ga('send', 'camp', {
      eventCategory: 'Clicks',
      eventLabel: 'More Details',
      eventAction: 'Click on more details button',
      eventValue: this.camp_id
    });
    window.open(this.camp.url);
  }

  add_review_redirect(index: number): void {
    // if (this.parent_id !== undefined) {
    // this.is_parent_id = true;
    this.is_review_click = true;
    this.selectedIndex = index;
    this.reviewsInput.nativeElement.scrollIntoView({ behavior: 'smooth' });
    // }
  }

  add_review() {
    if (this.validate_review()) {
      const input_data = {
        'input': {
          'entity_type': ENTITY_TYPES_ENUM.CAMP,
          'entity_id': this.camp_id,
          'parent_id': null,
          'review': this.review,
          'is_approved': false
        }

      };
      this.reviewService.add_review(input_data).subscribe(data => {
        if (data['status'] === true) {
          this.isSuccessVisible = true;
          this.isErrorVisible = false;
          setTimeout(() => {
            this.isSuccessVisible = false;
            this.review = '';
          }, 3000);

          this.errorMessage = this.commonErrorMessage.REVIEW_ADDED_SUCCESS;
        } else {
          this.isErrorVisible = true;
          this.errorMessage = this.commonErrorMessage.DUPLICATE_REVIEW;
        }
      }, error => {
        this.isErrorVisible = true;
        this.errorMessage = this.campErrorMessage.SOMETHING_WENT_WRONG;
      });


    }
  }
  get_reviews() {
    if (this.user_reviews.length === 0) {
      this.reviewService.get_reviews_by_type('hiking_trail', true, this.camp_id).subscribe(data => {
        if (data['status']) {
          this.reviews_present = true;
          this.user_reviews = data['data'];
        } else {
          this.reviews_present = false;
          this.user_reviews = [];
        }
      }, error => {
        // alert(this.trailErrorMessage.GET_DATA_ERROR);
      });
    }
  }
  validate_review() {
    if (this.review.trim().length === 0) {
      this.isErrorVisible = true;
      this.errorMessage = 'Review is required';
      setTimeout(() => {
        this.isErrorVisible = false;
      }, 3000);
      return false;
    }
    this.isErrorVisible = false;
    return true;
  }

  format_age() {
    if (this.camp.min_age == 0 && this.camp.max_age == 99) {
      return "Good for all ages";
    }
    if (this.camp.min_age != 0 && this.camp.max_age == 99) {
      return "Good for " + this.camp.min_age + " years and above";
    } else {
      return "Good for " + this.camp.min_age + " to " + this.camp.max_age + " years";
    }
  }

  format_time(timeString) {
    const H = +timeString.substr(0, 2);
    const h = H % 12 || 12;
    const ampm = (H < 12 || H === 24) ? "AM" : "PM";
    timeString = h + timeString.substr(2, 3) + ampm;
    return timeString;
  }

  calendar_redirects() {
    this.add_analytics_data('CALENDAR');
    window.open('https://calendar.google.com');
  }

  save_camp() {
    //if (this.parent_id !== undefined) {
    this.add_analytics_data('SAVE');
    this.isSaveVisible = true;
    // }
  }
  add_analytics_data(atype: any) {
    let action = '';
    switch (atype) {
      case 'CLICK':
        action = ACTION.CLICK;
        break;
      case 'SAVE':
        action = ACTION.SAVE;
        break;
      case 'CALENDAR':
        action = ACTION.CALENDAR;
        break;
    }
    let analytics_input = {};
    // if (this.parent_id !== undefined) {
    analytics_input = {
      'input_data': [{
        'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.CAMP,
        'entity_id': this.camp_id,
        'interface': INTERFACE_ENUM.FE,
        //'parent_id': this.parent_id,
        'action': action,
        'referrer': '/root/home'
      }]
      // };
    }
    //  else {
    //   analytics_input = {
    //     'input_data': [{
    //       'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.CAMP,
    //       'entity_id': this.camp_id,
    //       'interface': INTERFACE_ENUM.FE,
    //       'action': action,
    //       'referrer': '/root/home'
    //     }]
    //   };
    // }
    this.reviewService.add_analytics_actions(analytics_input).subscribe(data => {
      if (atype === 'CLICK') {
        this.is_save_action();
        //this.is_parent_id = true;
      }
    }, error => {
    });

  }

  is_save_action() {
    this.reviewService.verify_save_action(null, ANALYTICS_ENTITY_TYPES_ENUM.CAMP, this.camp_id).subscribe(data => {
      if (data['status'] === true) {
        this.isSaveVisible = true;
      } else {
        this.isSaveVisible = false;
      }
    }, error => {
    });
  }

  is_delete_action() {
    this.reviewService.delete_action(this.camp_id,ANALYTICS_ENTITY_TYPES_ENUM.CAMP).subscribe(data => {
      if (data['status'] === true) {
        this.isSaveVisible = false;
      } else {
        this.isSaveVisible = true;
      }
    }, error => {
    });
  }

  addReviewSection(event) {
    if (event == false) {
      this.class = true;
    } else {
      this.class = false;
    }

  }
  deleteUser(linkName) {
    this.ClickName = linkName;
    this.dialogRef = this.dialog.open(this.deleteuser, {
      width: "626px"
    });
  }

  //this function will open a popup when user is not loggen in
  checklogin(linkName) {
    if (this.isLogedin) {
      if (linkName == this.saveEvent) {
        this.save_camp();
      } else if (linkName == this.ClickName.addToReview) {
        this.add_review_redirect(2);
      }
    } else {
      this.deleteUser(linkName);
    }
  }
  signin() {
    sessionStorage.setItem('current_url', JSON.stringify(this.currentUrl))
    this.authService.login();
    this.closeDialog();
  }
  closeDialog() {
    this.dialogRef.close();
  }

}
