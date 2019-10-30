import { Account, Parent } from "./account";
import { Kid } from "./kid";

export class User {
    error: string;
    account: Account;
    parent: Parent;

    constructor() {
        this.parent = new Parent();
    }
}
