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
        private http: HttpClient,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<PlaydateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.message = " found this interesting family-friendly event on Kin Parenting - " 
                + this.data.event.name 
                + " - https://kinparenting.com/events/" + this.data.event.event_id 
                + ". ";
       
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
        console.log(this.data.isLoggedIn);
        if (this.data.isLoggedIn) {
            this.userService.getUser().subscribe((user) => {
                this.user = user;
                this.form.get('senderName').setValue(this.user.parent.first_name);
            });
        }
    }


    save() {
        console.log(this.form.value);
        console.log(this.data);
        if (this.form.get('toPhone').value !== '') {
            this.sendSMS();
        }
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
        + "Let " + this.form.get('senderName').value + " know if you'd like to join along! PS: Do not reply to this message.\nThank you,\nKin Parenting Team (https://kinparenting.com)";
        const url = `${API_URL}send-email/`;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post(url, data, { headers: headers, responseType: 'json' }).subscribe(response => {
        }, error => {
         });
    }

    sendSMS() {
        var data = {};
        data["To"] = "+1" + this.form.get('toPhone').value;
        data["From"] =  "+12562083976";
        data["Body"] = "Your friend " + this.form.get('senderName').value + this.message 
        + "Let " + this.form.get('senderName').value + " know if you'd like to join along!\nPS: Do not reply to this message.";
        const url = `${API_URL}send-sms/`;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post(url, data, { headers: headers, responseType: 'json' }).subscribe(response => {
        }, error => {
         });
    }

}