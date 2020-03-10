export default class Recommendation {
    id: string;
    fields: {
        ID: number,
        Title: string,
        KinId: number,
        URL: string,
        Category: any[],
        Recommender: string,
        Age: string[],
        Review: string,
        Image: any[],
        Visibility: boolean,
        HomePage: boolean,
    };
    createdTime: string;

    constructor() {
    }
}
