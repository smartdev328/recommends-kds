import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '@shared/constants/UrlConstants';
import { AuthService } from '@shared/service/auth.service';
import { UserService } from '@shared/service/user.service';
import { User } from '@shared/model/user';
import { Observable } from 'rxjs';
import { ReviewsService } from '../../component/add-review/reviews.service';
import { ANALYTICS_ENTITY_TYPES_ENUM, INTERFACE_ENUM, ACTION } from '../../shared/constants/AnalyticsConstants';

@Component({
    selector: 'playdate-dialog',
    templateUrl: './playdate-dialog.component.html',
    styleUrls: ['./playdate-dialog.component.css']
})
export class PlaydateDialogComponent implements OnInit {

    form: FormGroup;
    message:string;
    username: string;
    public isAuthenticated$: Observable<boolean>;
    public isLoggedIn: boolean;
    public user: User;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private reviewService: ReviewsService,
        private http: HttpClient,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<PlaydateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.message = " would like to add you as a friend on Kin Parenting."
                    + " Please accept the request by logging in or signing up at https://kinparenting.com/login." 
                
        this.form = fb.group({
            senderName: ['', [Validators.required, Validators.pattern("[A-Za-z]*")]],
            toPhone: ['', Validators.pattern("[0-9]*")],
            toEmail: ['', Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")],
        });

    }

    ngOnInit() {
        this.isAuthenticated$ = this.authService.isAuthenticated$;
        this.isAuthenticated$.subscribe(data => {
            this.isLoggedIn = data;
            this.authService.setAuth(this.isLoggedIn);
        })
        if (this.data.isLoggedIn) {
            this.userService.getUser().subscribe((user) => {
                this.user = user;
                this.form.get('senderName').setValue(this.user.parent.first_name);
            });
        }
    }

    /*
    add_analytics_data() {
        const final_data = {
          'input_data': []
        };
        const input_final_data = [];
          const final_key_value_pair = {
            'entity_type': ANALYTICS_ENTITY_TYPES_ENUM.EVENT,
            'entity_id': (this.data.event.event_id ? this.data.event.event_id : this.data.event.id),
            'interface': INTERFACE_ENUM.FE,
            'action': ACTION.PLAYDATE_INVITE,
            'referrer': '/root/home' };
        input_final_data.push(final_key_value_pair);
        final_data['input_data'] = input_final_data;
        this.reviewService.add_analytics_actions(final_data).subscribe(data => {
          }, error => {
        });
    }
    */


    save() {
        //this.add_analytics_data();
        if (this.form.get('toEmail').value !== '') {
            this.sendEmail();
        }
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

    sendEmail() {
        var data = {};
        data["toEmails"] = [this.form.get('toEmail').value];
        data["subject"] =  this.form.get('senderName').value + " is inviting you....";
        data["message"] = "Hi there!\n" + "Your friend " + this.form.get('senderName').value + this.message 
        + "\n\nThank you,\nKin Parenting Team (https://kinparenting.com)";
        const url = `${API_URL}send-email/`;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post(url, data, { headers: headers, responseType: 'json' }).subscribe(response => {
        }, error => {
         });
    }


}