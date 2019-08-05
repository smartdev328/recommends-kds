import { Item } from "./item";

export class Kid {
    nickname: string;
    age: number;
    interests: Item[];

    constructor() {
        this.interests = [];
    }
}
