import { Component, OnInit } from '@angular/core';
import {CampModel} from './camp.model'
import {CampConstants} from '../constants/CampConstants';
import {AddCampService} from './add-camp.service';
import {ValidationRules} from '../utils/ValidationRules';


@Component({
  selector: 'app-add-camp',
  templateUrl: './add-camp.component.html',
  styleUrls: ['./add-camp.component.css']
})

export class AddCampComponent implements OnInit {

  public campModel : any;
  public categoryList: any;
  public campConstants :any;
  public cat_id: number;
  public cat_name:string;
  public showError:Boolean;
  public camp_error:any;
  public validationRules:any;
  data: any = {};

  constructor(private addCampService:AddCampService) {
    this.campModel = new CampModel();
    this.campConstants = new CampConstants();
    this.validationRules = new ValidationRules();
    this.categoryList = this.campConstants.CAMP_CATEGORY;
    this.showError = false;
    this.cat_name = '';
    this.camp_error=[];
  }

  ngOnInit() {

  }

  onSubmit() {
    this.addCamp()
  }

  addCamp(){
    
    this.campModel.category = this.cat_name;
    this.campModel.max_age = this.campModel.max_age ? this.campModel.max_age : 0;
    this.campModel.min_age = this.campModel.min_age ? this.campModel.min_age : 0;
    let final_error = [];
      const api_input = {
        "camps_data" : this.campModel
      };
      this.addCampService.add_camp(api_input).subscribe(data=>{
        if (data['status'] == true){
          this.showError = false;
          alert(data['msg'])
        }else{
          this.showError = true;
          
          this.camp_error.push(data['msg'])
        }
      },error => {
        this.camp_error = [];
        this.showError = true;
        const server_error  = error.error.error;
        for ( var error_key in server_error) {
          let error_msg = server_error[error_key][0];
          this.camp_error.push(error_key+" :" + error_msg);
        }
      });
    
  }

  set_cat_name(cat_obj){
    this.cat_name = cat_obj;
  }

}

