import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION } from '../../../shared/constants/AnalyticsConstants';
import { ReviewsService } from '../../../component/add-review/reviews.service';
import { EventConstants } from '../../../shared/constants/EventConstants';
import { VenueConstants, VenueErrorMessage } from '../../../shared/constants/VenueConstants';
import { ErrorMessage } from '../../../shared/constants/CommonConstants';
import { VenueListingService } from '../../../venue/venue-listing/venue-listing.service';
import { API_URL } from '@shared/constants/UrlConstants';
import { MatDialogRef, MatDialog, } from "@angular/material";
import { Observable } from 'rxjs';
import { AuthService } from '@shared/service/auth.service';
import { NgForm } from '@angular/forms';

declare let ga: any;

@Component({
  selector: 'app-saved-listing',
  templateUrl: './saved-listing.component.html',
  styleUrls: ['./saved-listing.component.css']
})
export class SavedListingComponent implements OnInit {

  data_list;
  isExplore = false;
  public category: string;
  public locations: any;
  showMore = false;
  start = 0;
  end = 20;
  oldFilterData = true;
  newFilterData = false;
  public isErrorVisible: boolean;
  public errorMessage: String;
  count = 0;
  public isAuthenticated$: Observable<boolean>;
  isLogedin = false;


  entity_type: string;
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private datePipe: DatePipe,
              private router: Router,
              private titleService: Title,
              private metaService: Meta,
              private reviewService: ReviewsService,
              private authService: AuthService,
              public dialog: MatDialog,
              private venueListingService: VenueListingService) { 
                this.isAuthenticated$ = this.authService.isAuthenticated$;
            
              }
              

  ngOnInit() {
    // Getting the Entity type
    this.route.paramMap.subscribe(params => {
      this.entity_type = params.get("id");
      if(this.entity_type == 'HIKING_TRAIL'){
        this.entity_type =  'Hiking Trail';
      }
    })
    this.isErrorVisible = false;
    this.errorMessage = '';
    this.get_venue_details();
    this.isAuthenticated$.subscribe(data => {
      this.isLogedin = data;
    })
  
  }
  //Get listing of Saved Entity
  get_venue_details() {
      this.venueListingService.getSavedListing(this.entity_type).subscribe(data => {
        if(this.entity_type == 'EVENT'){
          this.data_list = data['events'];
          if (this.data_list.length > this.end) {
            this.showMore = true;
          }
          if(this.data_list.length == 0){
            this.isErrorVisible = true;
            this.errorMessage = "You haven't saved any events. Add them from the listings page to better track things that interest you."; 
          }
          this.isExplore = false;
        }if(this.entity_type == 'VENUE'){
          this.data_list = data['venues'];
          if (this.data_list.length > this.end) {
            this.showMore = true;
          }
          if(this.data_list.length == 0){
            this.isErrorVisible = true;
            this.errorMessage = "You haven't saved any venues. Add them from the listings page to better track things that interest you."; 
          }
          this.isExplore = false;
        }if(this.entity_type == 'Hiking Trail'){
          this.data_list = data['trails'];
          if (this.data_list.length > this.end) {
            this.showMore = true;
          }
          if(this.data_list.length == 0){
            this.isErrorVisible = true;
            this.errorMessage = "You haven't saved any trails. Add them from the listings page to better track things that interest you."; 
          }
          this.isExplore = false;
        }if(this.entity_type == 'CAMP'){
          this.data_list = data['camps'];
          if (this.data_list.length > this.end) {
            this.showMore = true;
          }
          if(this.data_list.length == 0){
            this.isErrorVisible = true;
            this.errorMessage = "You haven't saved any camps. Add them from the listings page to better track things that interest you."; 
          }
          this.isExplore = false;
        }

        });
    }
  }
