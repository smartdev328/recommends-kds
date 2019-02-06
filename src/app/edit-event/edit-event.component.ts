import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {EventConstants } from '../constants/EventConstants';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  event_id: any;
  event: any;
  eventForm: FormGroup;
  result: any;
  submitted = false;
  serverResponse: string;
  showServerResponse = false;
  edit_page_event_id: any;
  classificationId : number;
  public eventConstatnts = new EventConstants();
  public primary_cat = this.eventConstatnts.PRIMARY_CATEGORY;
  public secondary_cat = this.eventConstatnts.SECONDARY_CATEGORY;
 public  selectedPrimaryCat: number = null;
 public  selectedSecondaryCat: number = null;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.event_id = params['eventId'];
        this.edit_page_event_id = this.event_id;
        this.createForm();
        this.get_event_details();
    });
  }

  onUpdate() {
    this.submitted = true;
    if (this.eventForm.invalid) {
        return;
    }
    this.eventForm.controls['classifications'].setValue({
      'event_id': this.event_id,
      'classifier' : 'data-entry',
      'id' :  this.classificationId,
      'classification1' : this.eventForm.controls['selectedPrimaryCat'].value ? this.eventForm.controls['selectedPrimaryCat'].value : 0 ,
      'classification2' : this.eventForm.controls['selectedSecondaryCat'].value ? this.eventForm.controls['selectedSecondaryCat'].value : 0
    });
    this.eventForm.patchValue({'event_id' : this.event_id});
    var data = JSON.stringify({'input_data' : this.eventForm.value});
    data = data.replace(/[\u2018\u2019]/g, "'")
                .replace(/[\u201C\u201D]/g, '"');

    let url = "https://kin-api-dev.kinparenting.com/events/";
    const headers = new HttpHeaders()
        .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk')
        .set('Content-Type',  'application/json');
     this.http.put(url,data, { headers: headers, responseType: 'text'}).subscribe(response => {
       alert("Data updated successfully");
        this.serverResponse = response;
        this.showServerResponse = true;
      }, error => {
        if (error.status == 409) {
          alert ('Url Or Image url already exist');
        } else if (error.status == 400) {
          alert ('Please enter valid Url or Image Url');
        } else {
          alert ('Something went wrong');
        }
      });
  }

  checkUnicode(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value.indexOf('\\') !== -1 ) {
        return { 'unicode': true };
    }
    return null;
  }

  checkDelimiters(control: AbstractControl): { [key: string]: boolean } | null {
    const word = control.value.replace(/[\u2018\u2019]/g, '\'')
                .replace(/[\u201C\u201D]/g, '"');
    if (word.indexOf('"') !== -1 ) {
        return { 'delimiters': true };
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
  
    if (control.value != null){
      const date = control.value.split('-');
    if (date.length !== 3 || date[0].length !== 4 || date[1].length !== 2 || date[2].length !== 2) {
        return { 'date': true };
    }
    return null;
    }
  }

  checkTime(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value != null){
    const time = control.value.split(':');
    if (time.length !== 3 || time[0].length !== 2 || time[1].length !== 2 || time[2].length !== 2) {
        return { 'time': true };
    }
    return null;
  }
  }

  get f() { return this.eventForm.controls; }

 createForm() {

    this.eventForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required
      ]),
      'url': new FormControl('', [
        Validators.required,
        
      ]),
      'image_url': new FormControl('', [
        Validators.required
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
        Validators.required
      ]),
      'min_age': new FormControl(0, []),
      'max_age': new FormControl(99, []),
      'misc': new FormControl('', []),
      'email': new FormControl('', []),
      'contact_number': new FormControl('', [
        this.checkIsNumber
      ]),
      'state': new FormControl({value:  'CA', disabled: true}, []),
      'host': new FormControl('', []),
      'country': new FormControl({value:  'USA', disabled: true}, []),
      'gender_affinity': new FormControl({value:  '0', disabled: true}, [
      ]),
      'tags': new FormControl('', []),
      'event_id': new FormControl('', []),
      'classifications': new FormControl('', [])
    });
  }

  get_event_details() {
   let url = 'https://kin-api-dev.kinparenting.com/events/' + this.event_id +"/";
    //let url = this.URLConstatnts.API_URL + 'events/' + this.event_id;
    let data = {};
    const headers = new HttpHeaders()
        .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk');
    this.http.get(url, { headers: headers, responseType: 'text' }).subscribe(data => {
      data = data.replace(/\n/g, "");
      data = JSON.parse(data);
      this.result =  data['event'];
      this.eventForm.patchValue(this.result);
      if (data['event']['classifications'].length > 0) {
        this.classificationId = data['event']['classifications']['0'].id;
        this.eventForm.controls['selectedPrimaryCat'].setValue(parseInt(data['event']['classifications']['0'].classification1));
        this.eventForm.controls['selectedSecondaryCat'].setValue(parseInt(data['event']['classifications']['0'].classification2));
       } else {
        this.classificationId = 0;
      }


    })
  }

  reset_event() {
    this.eventForm.reset();
    this.eventForm.controls['country'].setValue('USA');
    this.eventForm.controls['state'].setValue('CA');
    this.eventForm.controls['gender_affinity'].setValue('0');
  }
  previous_event() {
    this.edit_page_event_id = parseInt(this.event_id) - 1;
    if (this.edit_page_event_id !== undefined  && this.event_id > 0) {
        this.router.navigate(['/edit-event/' + this.edit_page_event_id]);
    } else {
      alert('event_id should be greater than zero');
    }
  }
  next_event() {
    this.edit_page_event_id = parseInt(this.event_id) + 1;
    if (this.edit_page_event_id !== undefined && this.event_id > 0 ) {
        this.router.navigate(['/edit-event/' + this.edit_page_event_id ]);
    } else {
       alert('event_id should be greater than zero');
    }
  }

}
