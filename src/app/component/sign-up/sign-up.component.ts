import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    modalRef: BsModalRef;
    registerForm: FormGroup;
    childForm: FormGroup;
    submitted = false;
    public isSuccessVisible: Boolean;
    public isUserCreationError: Boolean;
    public show_kid_form: Boolean;


    constructor(
        private titleService: Title,
        private formBuilder: FormBuilder,
        private fb: FormBuilder,
        private http: HttpClient,
        private router:Router) {
    }


    ngOnInit() {
        this.titleService.setTitle('Kin - The Parenting Assistant');
        this.registerForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: [''],
            email: ['', Validators.required],
            zip_code: ['', [Validators.required, Validators.minLength(2)]],
            src: [''],
            src_id: [''],
        });
        this.isSuccessVisible = false;
        this.isUserCreationError = false;
        this.show_kid_form = false;
        /* Initiate the form structure */
        this.childForm = this.fb.group({
            child_array: this.fb.array([this.fb.group({ age: '', nick_name: '', interests: '', parent_id: '', gender: '' })])
        });
    }

    toggle_show_kif_form() {
        this.show_kid_form = this.show_kid_form ? false : true;
    }

    get newChild() {
        return this.childForm.get('child_array') as FormArray;
    }

    /////// This is new /////////////////

    addNewChild() {
        this.newChild.push(this.fb.group({ age: '', nick_name: '', interests: '', parent_id: '', gender: '' }));
    }

    deleteChild(index) {
        if (index != 0) {
            this.newChild.removeAt(index);
        }
    }

    //////////// End ////////////////////

    // convenience getter for easy access to form fields
    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        } else {
            const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
            this.registerForm.controls['src'].setValue('web');
            this.registerForm.controls['src_id'].setValue(random);
            let data = JSON.stringify(this.registerForm.value);
            data = data.replace(/[\u2018\u2019]/g, '\'')
                .replace(/[\u201C\u201D]/g, '"');
            //const url = 'https://kin-api-dev.kinparenting.com/users/';
             const url = 'http://ec2-54-215-142-151.us-west-1.compute.amazonaws.com/users/';
            const headers = new HttpHeaders()
                .set('x-api-key', 'seDqmi1mqn25insmLa0NF404jcDUi79saFHylHVk')
                .set('Content-Type', 'application/json');
            this.http.post(url, data, { headers: headers, responseType: 'text' }).subscribe(response => {
                
                data = response.replace(/\n/g, '');
                data = JSON.parse(data);

                if (data['error'] !== undefined) {
                    this.isUserCreationError = true;
                    setTimeout(() => {
                        // window.location.replace('/');
                        this.isUserCreationError = false;
                    }, 5000);
                } else {
                    // const url = 'https://kin-api-dev.kinparenting.com/kids/';
                    const url = 'http://ec2-54-215-142-151.us-west-1.compute.amazonaws.com/kids/';
                    for (let i = 0; i < this.newChild.length; i++) {
                        if (this.newChild.value[i].nick_name.trim().length
                            && this.newChild.value[i].interests.trim().length) {

                            this.newChild.value[i].parent_id = data['account'].parent_id;
                            const headers = new HttpHeaders().set('Content-Type', 'application/json');
                            this.http.post(url, this.newChild.value[i], { headers: headers, responseType: 'text' }).
                                subscribe(response => {
                                    
                                    data = response.replace(/\n/g, '');
                                    data = JSON.parse(data);
                                    this.router.navigate(['/get-started']);
                                });
                        }
                    }
                    this.isSuccessVisible = true;
                    setTimeout(() => {
                        // window.location.replace('/');
                        this.isSuccessVisible = false;
                    }, 5000);
                }
            });
        }
    }
    closePopup() {
        this.modalRef.hide();
    }
}
