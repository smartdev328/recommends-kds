import { AddHikingTrailService } from './../add-hiking/add-hiking.service';
import { HikingTrailModel } from './../add-hiking/hiking.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UrlConstants} from '../constants/UrlConstants';
import {ValidationRules} from '../utils/ValidationRules';


@Component({
  selector: 'app-edit-hiking',
  templateUrl: './edit-hiking.component.html',
  styleUrls: ['./edit-hiking.component.css']
})
export class EditHikingTrailComponent implements OnInit {
  public edit_page_hiking_trail_id: any;
  public hiking_trail_id: any;
  public URLConstatnts = new UrlConstants();
  public hikingTrailModel: any;
  public categoryList: any;
  public hikingTrailConstants: any;
  public showError: Boolean;
  public hiking_trail_error: any;
  public validationRules: any;

  constructor(private addHikingTrailService: AddHikingTrailService, private route: ActivatedRoute,
    private router: Router, private http: HttpClient) {
    this.hikingTrailModel = new HikingTrailModel();
    this.validationRules = new ValidationRules();
    this.showError = false;
    this.hiking_trail_error = [];
  }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hiking_trail_id = params['hikingTrailId'];
        this.edit_page_hiking_trail_id = this.hiking_trail_id;
        this.hikingTrailModel = new HikingTrailModel();
        this.get_hiking_trail_details();
    });
}

get_hiking_trail_details() {
  const url = this.URLConstatnts.API_URL + 'hiking-trails/' + this.hiking_trail_id + '/';
  //const url = 'http://127.0.0.1:5050/hiking-trails/' + this.hiking_trail_id + '/';

  const headers = new HttpHeaders()
                .set('Content-Type', 'application/json');
      
  this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
    data = data.replace(/\n/g, '');
    data = JSON.parse(data);
    if (data['status']) {
      this.hikingTrailModel = data['data']['0'];
    } else {
      alert('Hiking trail data not available');
    }
  });

}

reset_hiking_trail(this) {
  const resetHikingTrailModel = new HikingTrailModel();
  this.hikingTrailModel = resetHikingTrailModel;
}

previous_hiking_trail() {
  this.edit_page_hiking_trail_id = parseInt(this.hiking_trail_id) - 1;
  if (this.edit_page_hiking_trail_id !== undefined  && this.hiking_trail_id > 0) {
      this.router.navigate(['/edit-hiking/' + this.edit_page_hiking_trail_id ]);
  } else {
    alert('hiking_trail_id should be greater than zero');
  }
}

next_hiking_trail() {
  this.edit_page_hiking_trail_id = parseInt(this.hiking_trail_id) + 1;

  if (this.edit_page_hiking_trail_id !== undefined && this.hiking_trail_id > 0 ) {
      this.router.navigate(['/edit-hiking/' + this.edit_page_hiking_trail_id ]);
  } else {
     alert('hiking_trail_id should be greater than zero');
  }
}

update_hiking_trail() {
  const final_error = [];
    const api_input = {
      'data' : this.hikingTrailModel
    };
    this.addHikingTrailService.update_hiking_trail(api_input).subscribe(data => {
      if (data['status'] === true) {
        this.showError = false;
        alert(data['msg']);
      } else {
        this.showError = true;
        this.hiking_trail_error.push(data['msg']);
      }
    }, error => {
      this.hiking_trail_error = [];
      this.showError = true;
      const server_error  = error.error.error;
      for (const error_key in server_error) {
        const error_msg = server_error[error_key][0];
        this.hiking_trail_error.push(error_key + ' :' + error_msg);
      }
    });

}
}
