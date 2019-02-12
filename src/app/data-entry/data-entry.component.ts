import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {EventConstants } from '../constants/EventConstants';

@Component({
    selector: 'app-data-entry',
    templateUrl: './data-entry.component.html',
    styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent implements OnInit {
    eventForm: FormGroup;
    submitted: boolean = false;
    serverResponse: string;
    showServerResponse: boolean = false;
    public eventConstatnts = new EventConstants();
    public primary_cat = this.eventConstatnts.PRIMARY_CATEGORY;
    public secondary_cat = this.eventConstatnts.SECONDARY_CATEGORY;
    public  selectedPrimaryCat: number = null;
    public  selectedSecondaryCat: number = null;
    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.createForm();
    }

  onSubmit(){
    this.submitted = true;
    if (this.eventForm.invalid) {
        return;
    }
    this.eventForm.controls['classifications'].setValue({
      'classifier' : 'data-entry',
      'classification1' : this.eventForm.controls['selectedPrimaryCat'].value ? this.eventForm.controls['selectedPrimaryCat'].value : 0 ,
      'classification2' : this.eventForm.controls['selectedSecondaryCat'].value ? this.eventForm.controls['selectedSecondaryCat'].value : 0
    });
      this.eventForm.value['venue_id'] = this.eventForm.value['venue_id'].trim() ==0 ? '' :
          this.eventForm.value['venue_id'];
    var data = JSON.stringify(this.eventForm.value);
    data = data.replace(/[\u2018\u2019]/g, "'")
                .replace(/[\u201C\u201D]/g, '"');
    // let url = "https://kin-api-dev.kinparenting.com/events/";
    let url = "http://127.0.0.1:9006/events/";

    const headers = new HttpHeaders()
        .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk')
        .set('Content-Type',  'application/json');
    this.http.post(url, data, { headers: headers, responseType: 'text'}).subscribe(response => {
        this.serverResponse = response;
        let str1 = new String( "Found duplicate entry against  URL , start_time and start_date" );
       let compaire = str1.localeCompare( this.serverResponse);
       if(compaire === 1){
        this.serverResponse = 'Event Added successfully';
       }
        this.showServerResponse = true;
    }, error => {
        alert ('Something went wrong');
    });
  }

    onReset() {
        this.createForm();
        this.submitted = false;
        this.showServerResponse = false;
    }

    checkUnicode(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value.indexOf("\\") !== -1 ) {
            return { 'unicode': true };
        }
        return null;
    }

  checkDelimiters(control: AbstractControl): { [key: string]: boolean } | null {
    var word = control.value.replace(/[\u2018\u2019]/g, "'")
                .replace(/[\u201C\u201D]/g, '"');
    if (word.indexOf('"') !== -1 ) {
        return { 'delimiters': true };
    }
    return null;
  }

 ValidateUrl(control: AbstractControl) {

    var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    if(!regex.test(control.value)){
        return { validUrl: true };
    }
    return null;
  }

    checkIsNumber(control: AbstractControl): { [key: string]: boolean } | null {
        if (isNaN(control.value)) {
            return { 'number': true };
        }
        return null;
    }

    checkDate(control: AbstractControl): { [key: string]: boolean } | null {
        var date = control.value.split('-');
        if (date.length !== 3 || date[0].length !==4 || date[1].length !==2 || date[2].length !==2) {
            return { 'date': true };
        }
        return null;
    }

    checkTime(control: AbstractControl): { [key: string]: boolean } | null {
        var time = control.value.split(':');
        if (time.length !==3 || time[0].length !==2 || time[1].length !==2 || time[2].length !==2) {
            return { 'time': true };
        }
        return null;
    }

    get f() { return this.eventForm.controls; }

    createForm() {

    this.eventForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        this.checkUnicode,
        this.checkDelimiters
      ]),
      'url': new FormControl('', [
        Validators.required, this.ValidateUrl
      ]),
      'image_url': new FormControl('', [
        Validators.required, this.ValidateUrl
      ]),
      'zip_code': new FormControl('', [
        Validators.required,
        this.checkIsNumber
      ]),
      'city': new FormControl('', [
        Validators.required
      ]),
      'venue': new FormControl('', [
        Validators.required
      ]),
      'street': new FormControl('', []),
      'selectedPrimaryCat': new FormControl('', []),
      'selectedSecondaryCat': new FormControl('', []),
      'price': new FormControl(0, []),
      'start_date': new FormControl('', [
        Validators.required,
        this.checkDate
      ]),
      'end_date': new FormControl('', [
        Validators.required,
        this.checkDate
      ]),
      'start_time': new FormControl('00:00:00', [
        Validators.required,
        this.checkTime
      ]),
      'end_time': new FormControl('23:59:00', [
        Validators.required,
        this.checkTime
      ]),
      'description': new FormControl('', [
        Validators.required,
        this.checkUnicode,
        this.checkDelimiters
      ]),
      'min_age': new FormControl(0, []),
      'max_age': new FormControl(99, []),
      'misc': new FormControl('', []),
      'email': new FormControl('', []),
      'contact_number': new FormControl('', [
        this.checkIsNumber
      ]),
      'state': new FormControl({value:  'CA', disabled: false}, []),
      'host': new FormControl('', []),
      'country': new FormControl({value:  'USA', disabled: false}, []),
      'gender_affinity': new FormControl({value:  '0', disabled: false}, [
      ]),
      'tags': new FormControl('', []),
      'classifications': new FormControl('', []),
        'venue_id': new FormControl('', [])

    });
  }
}
