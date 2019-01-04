export class UserSearch {

    name: String;
    city: String;
    state: String;
    url: String;
    image_url: String;
    price: Number;
    perm_close: any;
    category: Number;
    sec_cat: Number;
    misc:  {
                'rating': Number,
                'address': String,
                'adr_address': String,
                'g_p_id': String,
                'g_id': String,
                'geometry': Object,
                'map_url': String,
                'tips_for_parent': String,
                'parking': String,
                'place_full_info': Object
    };
    tags: String;
    email: String;
    description: String;
    contact_number: String;
    street: String;
    zip_code: String;
    timings: String;

    constructor( ) {
        this.name = '';
        this.city = '';
        this.state = '';
        this.url = '';
        this.image_url = '';
        this.price = 0;
        this.perm_close = 0;
        this.category = 0;
        this.sec_cat = 0;
        this.misc = {
            'rating': 0,
            'address': '',
            'adr_address': '',
            'g_p_id': '',
            'g_id': '',
            'geometry': {},
            'map_url': '',
            'tips_for_parent': '',
            'parking': '',
            'place_full_info' : {}
        };

        this.tags = '';
        this.email = '';
        this.description = '';
        this.contact_number = '';
        this.street = '';
        this.zip_code = '';
        this.timings = '';
    }
}