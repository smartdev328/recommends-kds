import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApproveVenueReviewsService } from '../../approve-reviews/approve-review.service';
import { UrlConstants } from '../../constants/UrlConstants';
import { VenuesService } from '../venues/venues.service';


@Component({
  selector: 'app-subscribe-venue',
  templateUrl: './subscribe-venue.component.html',
  styleUrls: ['./subscribe-venue.component.css']
})
export class SubscribeVenueComponent implements OnInit {
  public review: string;
  public isErrorVisible: Boolean;
  public errorMessage: String;
  public selected_row: any;
  public URLConstatnts = new UrlConstants();
  public parent_id: any;
  public venue_id: any;
  public rows: any;
  public columns: any;
  public selected: any;

  constructor(private route: ActivatedRoute, private approveReviewsService: ApproveVenueReviewsService,
    private http: HttpClient, private venuesService: VenuesService) {
    this.selected_row = [];
    this.rows = [];
    this.columns = [];
    this.selected = [];
    this.parent_id = '';
    this.venue_id = '';

    this.columns = [

      { prop: 'venue_id', name: 'EntityId' },
      { prop: 'parent_id', name: 'ParentId' },
      { prop: 'venue_name', name: 'VenueName' },
      { prop: 'state' },
      { prop: 'city' },
      {
        prop: 'is_checked',
        name: 'Unsubscribe All',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        headerCheckboxable: true,
        checkboxable: true,
        width: 130
      },
    ];

  }

  ngOnInit() {
    this.parent_id = this.route.snapshot.queryParamMap.get('parent_id');
    this.get_subscribed_venues();

  }

  onSelect(row) {
    this.selected_row = row.selected;
  }

  get_subscribed_venues() {
    let url = '';

    if (this.parent_id === null) {
      url = this.URLConstatnts.API_URL + 'subscribe-venue/';
    } else {
      url = this.URLConstatnts.API_URL + 'subscribe-venue/?parent_id=' + this.parent_id;
    }
    const headers = new HttpHeaders()
      .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk');
    this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
      data = data.replace(/\n/g, "");
      data = JSON.parse(data);
      if (data['status']) {
        this.rows = data['data'];
      } else {
        this.isErrorVisible = true;
        this.errorMessage = data['msg'];
      }
    }, error => {
      if (error.status == 400 || error.status == 404) {
        alert(error.error.msg);
      } else {
        alert('Something went wrong');
      }
    });

  }

  unsubscribe_venue() {

    if (this.selected_row.length > 0) {
      if (this.rows.length === this.selected_row.length && this.parent_id !== null) {
        this.venuesService.remove_all_subscriptions(this.parent_id).subscribe(data => {
        }, error => {
          this.errorMessage = 'Something went wrong while unsubscribe venue';
        });
      } else {
        for (let review_count = 0; review_count < this.selected_row.length; review_count++) {
          this.parent_id = this.selected_row[review_count]['parent_id'];
          this.venue_id = this.selected_row[review_count]['venue_id'];
          this.venuesService.remove_subscriptions(this.parent_id, this.venue_id).subscribe(data => {
          }, error => {
            this.errorMessage = 'Something went wrong while unsubscribe venue';
          });
        }
      }
      alert('Unsubscribe Successful');
      window.location.reload();
    } else {
      alert('No data selected');
    }
  }

}
