import { Component, OnInit } from '@angular/core';
import { HikingTrailModel } from './hiking.model';
import { AddHikingTrailService } from './add-hiking.service';
import { ValidationRules } from '../../utils/ValidationRules';


@Component({
  selector: 'app-add-hiking',
  templateUrl: './add-hiking.component.html',
  styleUrls: ['./add-hiking.component.css']
})

export class AddHikingTrailComponent implements OnInit {

  public hikingTrailModel: any;
  public hikingTrailConstants: any;
  public showError: boolean;
  public hiking_trail_error: any;
  public validationRules: any;
  serverResponse: string;


  constructor(private addHikingTrailService: AddHikingTrailService) {
    this.hikingTrailModel = new HikingTrailModel();
    this.validationRules = new ValidationRules();
    this.showError = false;
    this.hiking_trail_error = [];
  }

  ngOnInit() {
  }

  onSubmit() {
    this.addHikingTrail();
  }

  addHikingTrail() {
    const api_input = {
      "data": this.hikingTrailModel
    };
    this.addHikingTrailService.add_hiking_trail(api_input).subscribe(response => {
      if (response.indexOf("Data inserted successfully") > 0) {
        this.showError = false;
        alert('Hiking trail was added successfully.');
      } else {
        this.showError = true;
        if (response.indexOf("IntegrityError") > 0) {
          this.hiking_trail_error.push('Duplicate entry');
        }
      }
    }
    );

  }

}

