import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION } from '../../shared/constants/AnalyticsConstants';
import { ReviewsService } from '../../component/add-review/reviews.service';
import { HikingTrailConstants, HikingTrailErrorMessage } from '../../shared/constants/HikingTrailConstants';
import { ErrorMessage } from '../../shared/constants/CommonConstants';
import { HikingTrailsListingService } from '../hiking-listing/hiking-listing.service';
import { API_URL } from '@shared/constants/UrlConstants';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog, } from "@angular/material";
import { AuthService } from '@shared/service/auth.service';
@Component({
  selector: 'app-saved-hiking-listing',
  templateUrl: './saved-hiking-listing.component.html',
  styleUrls: ['./saved-hiking-listing.component.css']
})
export class SavedHikingListingComponent implements OnInit {
  dialogRef: any;
  public all_data;
  isExplore = false;
  oldFilterData = true;
  newFilterData = false;
  isExplorelen: Number = 0;
  start = 0;
  end = 21;
  showMore = false;
  showLayout = false;
  count = 0;
  moreTralis = 'more Tralis';
  hiking_explore;
  constructor(private hikingListingService :HikingTrailsListingService) { }

  ngOnInit() {
  this.get_Saved_hiking_trail_details();
  }

  get_Saved_hiking_trail_details() {
        // const url = API_URL +'actions/?entity_type=ETYPE_TRAILS&action_type=ATYPE_SAVE';

    this.hikingListingService.getSavedHikingList().subscribe(data => {
      console.log(data,'000000000000')

      if(data){

      }else{

      }
      // data = data.replace(/\n/g, '');
      // data = JSON.parse(data);
    //   if (data['trails'] != undefined && data['trails'].length > 0) {
    //     this.hiking_explore = data['trails'];
    //   } else {
    //     alert('No data found');
    //     this.hiking_explore = [];
    //   }
    //   this.isExplore = false;
    //   if (this.hiking_explore.length > this.end) {
    //     this.showMore = true;
    //   }
    // });
    });
  }
}
