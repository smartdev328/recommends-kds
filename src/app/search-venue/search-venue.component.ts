import { Component, OnInit } from '@angular/core';
import {UserSearch} from '../venue/venue.model';
import {SearchVenueService} from './search-venue.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {VenueConstants, VenueErrorMessage} from '../constants/VenueConstants';
import {ValidationRules} from '../utils/ValidationRules';



@Component({
  selector: 'app-search-venue',
  templateUrl: './search-venue.component.html',
  styleUrls: ['./search-venue.component.css']
})
export class SearchVenueComponent implements OnInit {
  public city: string;
  public name: string;
  public venue_id: number;
  public isShowTable: Boolean;
  public venueConstatnts = new VenueConstants();
  public venueErrorMessage = new VenueErrorMessage();
  public userSearch = new UserSearch();
  public validationRules = new ValidationRules();
  public jsonMiscData: String;
  public isUpdateShow = false;
  public primary_cat = this.venueConstatnts.PRIMARY_CATEGORY;
  public secondary_cat = this.venueConstatnts.SECONDARY_CATEGORY;
  public errorMessage: String;
  public isErrorVisible: Boolean;
  public venueData: any;
  public query_search:string;
  constructor(private searchVenueService: SearchVenueService , private router: Router) {
    this.isShowTable = true;
    this.isErrorVisible = true;
    this.venueData = [];
  }

  ngOnInit() {
  }

  get_venue_data(this) {
    this.isShowTable = false;
    const venue_id = this.venue_id;
    if (venue_id !== undefined) {
      this.searchVenueService.get_venue_by_id(venue_id).subscribe(data => {
        if ( data['venue'] !== undefined) {
          this.isShowTable = true;
          const tempVenueData = data['venue'];
          this.venueData.push(tempVenueData);
        } else {
          this.isShowTable = true;
          this.isErrorVisible = true;
          this.errorMessage = 'No venue present';
        }
      }, error => {
        this.isErrorVisible = true;
        this.errorMessage = error.error.error;
      });
    }
  }

  query_search_on_venue_data(this) {
    this.isShowTable = false;
    const querySearch = this.query_search;
    if (querySearch !== undefined && querySearch.length > 0) {
      this.searchVenueService.search_venue(querySearch).subscribe(data => {
        if ( data['venues'] !== undefined && data['venues'].length > 0) {
          this.isShowTable = true;
          const tempVenueData = data['venues'];
          this.venueData = tempVenueData;
        } else {
          this.isShowTable = true;
          this.isErrorVisible = true;
          this.errorMessage = 'No venue present';
        }
      }, error => {
        this.isErrorVisible = true;
        this.errorMessage = error.error.error;
      });
    }
  }

  edit_venues(currentVenueData) {
    let current_venue_id = currentVenueData.id;
    if(current_venue_id !== undefined || current_venue_id > 0) {
      this.router.navigate(['/edit-venue/' + current_venue_id]);
    }
  }
  search_venues() {
      if ( this.venue_id !== undefined ) {
        this.get_venue_data();
      } else if (this.query_search!=undefined || this.query_search.length > 0) {
        this.query_search_on_venue_data();
      }
  }



}
