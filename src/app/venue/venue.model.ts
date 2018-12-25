export class UserSearch {
    name: String;
    city: String;
    state: String;
    url: String;
    image_url: String;
    price: Number;
    perm_close: Number;
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
                'parking': String
    };
    tags: String;
    email: String;
    description: String;
    contact_number: String;
    street: String;
    zip_code: String;
    timings: String;
}