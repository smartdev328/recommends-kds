import { EventConstants } from "@shared/constants/EventConstants";

export class Kid {
    dob: string;
    gender: string;
    id: string;
    age: number;
    interests: any[];
    interest_categories: string[];
    kid_id: string;
    nick_name: string;
    parent_id: string;
    constructor() {
        this.interests = [];
    }
}
