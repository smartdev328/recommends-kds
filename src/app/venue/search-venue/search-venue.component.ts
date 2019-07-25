import { Component, OnInit } from '@angular/core';
import { UserSearch } from '../venue.model';
import { SearchVenueService } from './search-venue.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VenueConstants, VenueErrorMessage } from '../../constants/VenueConstants';
import { ValidationRules } from '../../utils/ValidationRules';



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
    public query_search: string;

    constructor(private searchVenueService: SearchVenueService, private router: Router) {
        this.isShowTable = true;
        this.isErrorVisible = false;
        this.venueData = [];
    }

    ngOnInit() {
    }

    get_venue_data(this) {
        this.isShowTable = false;
        const venue_id = this.venue_id;
        if (venue_id !== undefined) {
            this.searchVenueService.get_venue_by_id(venue_id).subscribe(data => {
                if (data['venue'] !== undefined) {
                    this.isShowTable = true;
                    const tempVenueData = data['venue'];
                    this.venueData = [];
                    this.venueData.push(tempVenueData);
                } else {
                    this.venueData = [];
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
                if (data['venues'] !== undefined && data['venues'].length > 0) {
                    this.isShowTable = true;
                    const tempVenueData = data['venues'];
                    this.venueData = [];
                    this.venueData = tempVenueData;
                } else {
                    this.isShowTable = true;
                    this.isErrorVisible = true;
                    this.venueData = [];
                    this.errorMessage = 'No venue present';
                }
            }, error => {
                this.isErrorVisible = true;
                this.errorMessage = error.error.error;
            });
        }
    }

    edit_venues(currentVenueData) {
        const current_venue_id = currentVenueData.id;
        if (current_venue_id !== undefined || current_venue_id > 0) {
            this.router.navigate(['/edit-venue/' + current_venue_id]);
        }
    }

    get_venues_by_name_city(this, name: string, city: string) {
        if (name !== undefined && city !== undefined) {
            this.searchVenueService.get_venues_by_name_city(this.name, this.city).subscribe(data => {
                if (data['status'] === true && data['data'].length > 0) {
                    this.isShowTable = true;
                    const tempVenueData = data['data'];
                    this.venueData = [];
                    this.venueData = tempVenueData;
                } else {
                    this.isShowTable = true;
                    this.isErrorVisible = true;
                    this.venueData = [];
                    this.errorMessage = 'No venue present';
                }
            }, error => {
                this.isErrorVisible = true;
                this.errorMessage = error.error.msg;
            });
        }
    }
    search_venues() {
        if (this.name !== undefined && this.city !== undefined && this.name.length > 0 && this.city.length > 0) {
            this.get_venues_by_name_city(this.name, this.city);
        } else if (this.venue_id !== undefined) {
            this.get_venue_data();
        } else if (this.query_search !== undefined) {
            if (this.query_search.trim().length > 0) {
                this.query_search_on_venue_data();
            } else {
                this.isErrorVisible = true;
                this.errorMessage = 'query search , ' + this.venueErrorMessage.PASS_VENUE_ID_OR_QUERY_SEARCH;
            }
        } else {
            this.isErrorVisible = true;
            this.errorMessage = 'Error : ' + this.venueErrorMessage.PASS_AT_LEAST_ONE_FIELD;
        }

    }

    validate_search_venue_fields() {
        if (this.query_search === undefined || this.query_search.trim().length === 0 ||
            this.venue_id === undefined || this.venue_id <= 0) {
            return 'query search , ' + this.venueErrorMessage.PASS_VENUE_ID_OR_QUERY_SEARCH;
        } else if (this.query_search.trim().length > 0 && this.validationRules.validate_text_length(this.query_search) === false) {
            return 'query search ' + this.venueErrorMessage.LENGTH_IN_BETWEEN + ' ' + this.venueConstatnts.TEXT_MIN_LENGTH + ' & ' +
                this.venueConstatnts.TEXT_MAX_LENGTH;
        } else {
            return true;
        }
    }

    closeErrorBox() {
        this.isErrorVisible = false;
    }


}
