import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import {UserSearch} from '../venue/venue.model';
import {VenuesService} from './venues.service';
import {VenueConstants, VenueErrorMessage} from '../constants/VenueConstants';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent implements OnInit {

  public venue_id: string;
  public venue: any;
  public isLoaded: boolean = true;
  public parking: String;
  public tips_for_parent: String;
  public rating: Number;
  public jsonMiscData: String;
  public miscData: any;
  public venueConstatnts = new VenueConstants();
  public venueErrorMessage = new VenueErrorMessage();
  public timings_array: any;
  public isShowMore: any;
  public place_full_info: any;
  public place_reviews: any;
  public category: string;
  public avg_rating: number;
  public google_rating_out_of: number;
  constructor(private route: ActivatedRoute,  private http: HttpClient, private titleService: Title,
  private venuesService: VenuesService) {
      this.venue = new UserSearch();
      this.parking = '';
      this.rating = 0;
      this.tips_for_parent = '';
      this.timings_array = [];
      this.isShowMore = false;
      this.place_full_info = {};
      this.place_reviews = [];
      this.category = '';
      this.google_rating_out_of = this.venueConstatnts.GOOGLE_RATING_OUT_OF;
  }

  ngOnInit() {
    // this.venue_id = this.route.snapshot.params['id'];
    // this.get_venue_details();

    this.route.params.subscribe(params => {
      const venue_id = params['id'];
      this.get_venue_data(venue_id);
    });
  }

  get_venue_data(venue_id: number) {
    if (venue_id !== undefined) {
      this.venuesService.get_venue_by_id(venue_id).subscribe(data => {
        if ( data['venue'] !== undefined) {
          this.venue = data['venue'];
          let temp_cat = this.venue.category;
          this.category = this.venue.category !== undefined && this.venue.category.length > 0 ? this.venue.category.join() :
              this.venueErrorMessage.NO_INFO_AVAILABLE;
          this.venue.perm_close = this.venue.perm_closed === true ? '1' : '0';
          this.venue.sec_cat = this.venue.sec_cat;
          this.parking = this.venue.misc.parking === undefined || this.venue.misc.parking.trim().length === 0 ?
              this.venueErrorMessage.NO_INFO_AVAILABLE : this.venue.misc.parking;
          this.tips_for_parent = this.venue.misc.tips_for_parent === '' ? '' : this.venue.misc.tips_for_parent;
          this.rating = this.venue.misc.rating;
          this.jsonMiscData = JSON.stringify(this.venue.misc);
          this.miscData = this.venue.misc;
          this.venue.description = this.venue.description === undefined || this.venue.description.trim().length === 0 ?
              this.venueErrorMessage.NO_INFO_AVAILABLE  : this.venue.description ;
          this.venue.image_url  = this.venue.image_url === '' || this.venue.image === undefined ?
              '../../assets/venue_default_image.png'
              : this.venue.image;
          this.timings_array = this.create_timing_json(this.venue.timings);
          this.place_full_info = this.venue.misc.place_full_info;
          this.place_reviews = this.place_full_info.reviews;
          this.avg_rating = this.calculate_avg_rating(this.place_reviews);
        }
      }, error => {
        alert(this.venueErrorMessage.GET_DATA_ERROR);
      });
    }
  }

  get_venue_details() {
    // let url = "https://kin-api.kinparenting.com/venues/" + this.venue_id;
    // const headers = new HttpHeaders()
    //     .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk');
    // this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
    //   data = data.replace(/\n/g, "");
    //   data = JSON.parse(data);
    //   this.venue = data["venue"];
    //   this.isLoaded = true;
    //   ga('send', 'venue', {
    //     venueCategory: 'Views',
    //     venueLabel: 'Venue Details',
    //     venueAction: 'View a specific venue page',
    //     venueValue: this.venue_id
    //   });
    // this.titleService.setTitle(this.venue.name);
    // })
    // this.venue = {
    //   "id": 442,
    //   "name": "The Little Gym of Morgan Hill",
    //   "url": "http://www.thelittlegym.com/morganhillca",
    //   "image_url": "https://www.thelittlegym.com/globalassets/corporate-marquee/marquee-become-an-owner.png",
    //   "price": "",
    //   "city": "Morgan Hill",
    //   "state": "CA",
    //   "personalized": "false",
    //   "distance": 0
    // }
  }

  format_price() {
    if(this.venue.price == "Free" || this.venue.price == "free" || this.venue.price == "") {
      return "Free"
    }
    else {
      return "From $" + this.venue.price;
    }
  }

  maps_redirect() {
    var search_query = this.venue.name + "," + this.venue.city;
    window.open('https://www.google.com/maps?q=' + search_query, '_blank');
  }

  website_redirect() {
    window.open(this.venue.url, '_blank');
  }

  calendar_redirects() {
    window.open('https://calendar.google.com');
  }

  create_timing_json(timing_slots: String) {
    return timing_slots.split(',');
  }
  showMoreHours(isShowMore= false) {
    this.isShowMore = isShowMore;
  }

  calculate_avg_rating(google_reviews) {
    let total_ratings = 0;
    if ( google_reviews.length) {
      google_reviews.forEach(function(each_element) {
        total_ratings += each_element['rating'];
      });
    }

    return total_ratings / google_reviews.length;
  }
}
