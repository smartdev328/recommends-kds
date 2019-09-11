import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION } from '../../shared/constants/AnalyticsConstants';
import { EventConstants } from '../../shared/constants/EventConstants';
import { VenueConstants, VenueErrorMessage } from '../../shared/constants/VenueConstants';
import { ErrorMessage } from '../../shared/constants/CommonConstants';
import { VenueListingService } from '../../venue/venue-listing/venue-listing.service';
import { API_URL } from '@shared/constants/UrlConstants';
import { MatDialogRef, MatDialog, } from "@angular/material";
import { Observable } from 'rxjs';
import { AuthService } from '@shared/service/auth.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {


  venues_list;
  isExplore = false;
  showMore = false;
  start = 0;
  end = 20;
  oldFilterData = true;
  newFilterData = false;
  public isErrorVisible: boolean;
  public isFilterErrorVisible: boolean;
  public errorMessage: String;
  public filterErrorMessage: String;

  count = 0;
  morePlace = 'more Places';
  public isAuthenticated$: Observable<boolean>;
  isLogedin = false;
  /*
    Filter Variables
  */
  public selected_cat: string;
  public selected_loc: String;
  public keyword: String;
  public cat_label: String;
  public loc_label: String;
  currentUrl: string;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private venueListingService: VenueListingService,
    private authService: AuthService,
  ) {
    /*
      Filter Variables
    */
    this.selected_cat = '';
    this.selected_loc = '';
    this.keyword = '';
    this.cat_label = 'Category';
    this.loc_label = 'Location';
    this.isAuthenticated$ = this.authService.isAuthenticated$;

  }
  ngOnInit() {
    this.isErrorVisible = false;
    this.errorMessage = '';
    this.isFilterErrorVisible = false;
    this.filterErrorMessage = '';
    this.isAuthenticated$.subscribe(data => {
      this.isLogedin = data;
    })
  }

}
