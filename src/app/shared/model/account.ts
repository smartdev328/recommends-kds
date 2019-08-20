import { RequestBody } from "./request-body";
import { Kid } from "./kid";

export class Account extends RequestBody {
    account_id: string;
    parent_id: string;
}

export class Parent {
    accounts: Account[];
    country: string;
    email: string;
    first_name: string;
    gender: string;
    kids: Kid[];
    last_name: string;
    last_reminder_notification: Date;
    nick_name: string;
    parent_id: string;
    phone_no: string;
    referred_by: string;
    zip_code: string;
}
