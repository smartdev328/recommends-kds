import { Account, Parent, Referral} from "./account";

export class User {
    error: string;
    account: Account;
    parent: Parent;
    referrals: Referral[];
    
    constructor() {
        this.parent = new Parent();
        this.referrals = [];
    }
}
