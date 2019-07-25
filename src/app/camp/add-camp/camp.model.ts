export class CampModel {

    constructor() {
        this.name = '';
        this.description = '';
        this.category = '';
        this.url = '';
        this.image_url = '';
        this.min_age = 5;
        this.max_age = 40;
        this.activity_types = '';
        this.cities = '';
        this.offered_during = '';
        this.venue_id = this.venue_id <= 0 ? null : this.venue_id;
        this.misc = {
            'am_extended_care': '',
            'pm_extended_care': '',
            'lunch': '',
            'timings': '',
            'tips': ''
        };
    }

    id: number;
    name: string;
    description: string;
    category: string;
    url: String;
    image_url: String;
    min_age: number;
    max_age: number;
    activity_types: string;
    cities: string;
    offered_during: string;
    venue_id: number;
    misc: {
        am_extended_care: string,
        pm_extended_care: string,
        lunch: string,
        timings: string,
        tips: string
    };
}