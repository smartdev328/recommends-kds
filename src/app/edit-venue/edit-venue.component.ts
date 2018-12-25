import { Component, OnInit } from '@angular/core';
import {UserSearch} from '../venue/venue.model';
import {EditVenueService} from './edit-venue.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {VenueConstatnts, VenueErrorMessage} from '../constatnts/VenueConstatnts';
import {ValidationRules} from '../utils/ValidationRules';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

@Component({
  selector: 'app-edit-venue',
  templateUrl: './edit-venue.component.html',
  styleUrls: ['./edit-venue.component.css']
})
export class EditVenueComponent implements OnInit {
  public venueConstatnts = new VenueConstatnts();
  public venueErrorMessage = new VenueErrorMessage();
  public userSearch = new UserSearch();
  public validationRules = new ValidationRules();
  public jsonMiscData: String;
  public isUpdateShow = false;
  public primary_cat = this.venueConstatnts.PRIMARY_CATEGORY;
  public  secondary_cat = this.venueConstatnts.SECONDARY_CATEGORY;
  public errorMessage: String;
  public isErrorVisible: Boolean;


  constructor( private editVenue_service: EditVenueService ,
               private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const venue_id = params['venueId'];
      this.get_venue_data(venue_id);
    });
  }

  get_venue_data(venue_id: number) {
    this.isErrorVisible = true;
    if (venue_id !== undefined) {
      this.editVenue_service.get_venue_by_id(venue_id).subscribe(data => {
        if ( data['venue'] !== undefined) {
          this.userSearch = data['venue'];
          let temp_cat = this.userSearch.category;
          this.userSearch.category = this.get_primary_cat_by_key(temp_cat[0]);
          this.userSearch.sec_cat = this.userSearch.sec_cat;
          this.userSearch.misc.parking = this.userSearch.misc.parking === undefined ? '' : this.userSearch.misc.parking;
          this.userSearch.misc.tips_for_parent = this.userSearch.misc.tips_for_parent === undefined ? '' : this.userSearch.misc.tips_for_parent;
          this.jsonMiscData = JSON.stringify(this.userSearch.misc);
        }
      }, error => {
        alert(this.venueErrorMessage.GET_DATA_ERROR);
      });
    }
  }

  update_venue(this) {
    var validation_response = this.validate_update_venue_fields(this);
    if ( validation_response === true ) {
      let api_input = { input : this.userSearch };
      this.editVenue_service.update_venue(api_input)
          .subscribe( data => {
            if ( data !== undefined && data.status === true) {
              this.isErrorVisible = true;
              this.errorMessage = 'Data has updated successfully!!!';
              alert(data.msg);
            } else {
              alert(JSON.stringify(data.msg));
            }
          }, error => {
            alert('Something went wrong');
            this.isErrorVisible = true;
            this.erorMessage = 'Something went wrong' ;
          });
    } else {
      this.isErrorVisible = true;
      this.errorMessage = validation_response;
    }
  }

  validate_update_venue_fields(this) {
    let user_search = this.userSearch;
    let basic_fields_validation = this.validationRules.validate_basic_venue_fields(user_search);

    if ( basic_fields_validation !== true) {
      return basic_fields_validation;
    } else if ( user_search.image_url === undefined || user_search.image_url.trim().length === 0) {
      return 'image_url , ' + this.venueErrorMessage.NOT_EMPTY;
    } else if ( user_search.street === undefined ||  user_search.street.trim().length === 0) {
      return 'street , ' + this.venueErrorMessage.NOT_EMPTY;
    } else if ( user_search.zip_code === undefined ||  user_search.zip_code.trim().length === 0) {
      return 'zip_code , ' + this.venueErrorMessage.NOT_EMPTY;
    } else if (this.validationRules.validate_url(user_search.image_url) === false) {
      return 'image_URL: , ' + this.venueErrorMessage.VALID_URL;
    } else if (this.validationRules.validate_url(user_search.url) === false) {
      return 'URL: , ' + this.venueErrorMessage.VALID_URL;
    } else if (user_search.email.length > 0 && this.validationRules.validate_email(user_search.email) === false) {
      return 'email: , ' + this.venueErrorMessage.VALID_EMAIL;
    } else if (this.validationRules.validate_us_zip_code(user_search.zip_code) === false) {
      return 'zip_code : , ' + this.venueErrorMessage.VALID_ZIP_CODE;
    } else {
      return true;
    }
  }

  get_primary_cat_by_key(cat_string: string) {
    const primary_cat_length = this.primary_cat.length;
      for (let count= 0; count < primary_cat_length ; count++ ) {
          if (this.primary_cat[count]['name'] === cat_string) {
            return this.primary_cat[count]['id'];
          }
    }
  }

}
