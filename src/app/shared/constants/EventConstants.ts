export class EventErrorMessage {
    public ERROR_ADDING_NEW_REVIEW = "Error while adding a new review";
    public SOMETHING_WENT_WRONG = " Something went wrong,please try again later";
    public GET_DATA_ERROR = "Error while getting information";
    public REVIEW_ADDED_SUCCESS = "Thank you!";
    public NO_EVENTS_FOUND = "No events found.";
}
export class EventConstants {

    public PRIMARY_CATEGORY = [
        { 'name': 'Active play', 'id': 1 },
        { 'name': 'Animals & Wildlife', 'id': 2 },
        { 'name': 'Arts & Crafts', 'id': 3 },
        { 'name': 'Books & Storytimes', 'id': 4 },
        { 'name': 'Cars, Planes, Trains and more...', 'id': 6 },
        { 'name': 'Community', 'id': 8 },
        { 'name': 'Festivals & Fairs', 'id': 9 },
        { 'name': 'Food & Cooking', 'id': 10 },
        { 'name': 'Hiking & Camping', 'id': 11 },
        { 'name': 'Language & Cultural', 'id': 12 },
        { 'name': 'Meet a character', 'id': 13 },
        { 'name': 'Movies & Video games', 'id': 14 },
        { 'name': 'Museums & Exhibitions', 'id': 15 },
        { 'name': 'Music & Concerts', 'id': 16 },
        { 'name': 'Puzzles, Blocks & Pretend', 'id': 5 },
        { 'name': 'Science & Technology', 'id': 17 },
        { 'name': 'Seasonal & Special Events', 'id': 18 },
        { 'name': 'Sports & Games', 'id': 19 },
        { 'name': 'Theater & Shows', 'id': 20 },
        { 'name': 'Volunteering', 'id': 7 },
        { 'name': 'Others', 'id': 21 }
    ];

    public LOCATIONS = [
        { 'name': 'Campbell', 'id': '' },
        { 'name': 'Cupertino', 'id': '' },
        { 'name': 'Los Altos', 'id': '' },
        { 'name': 'Los Gatos', 'id': '' },
        { 'name': 'Menlo Park', 'id': '' },
        { 'name': 'Milpitas', 'id': '' },
        { 'name': 'Mountain View', 'id': '' },
        { 'name': 'Palo Alto', 'id': '' },
        { 'name': 'San Francisco', 'id': '' },
        { 'name': 'San Jose', 'id': '' },
        { 'name': 'Santa Clara', 'id': '' },
        { 'name': 'Saratoga', 'id': '' },
        { 'name': 'Sunnyvale', 'id': '' },
    ];

    public SECONDARY_CATEGORY = [
        { 'name': 'Active play', 'id': 1 },
        { 'name': 'Animals & Wildlife', 'id': 2 },
        { 'name': 'Arts & Crafts', 'id': 3 },
        { 'name': 'Books & Storytimes', 'id': 4 },
        { 'name': 'Cars, Planes, Trains and more...', 'id': 6 },
        { 'name': 'Community', 'id': 8 },
        { 'name': 'Festivals & Fairs', 'id': 9 },
        { 'name': 'Food & Cooking', 'id': 10 },
        { 'name': 'Hiking & Camping', 'id': 11 },
        { 'name': 'Language & Cultural', 'id': 12 },
        { 'name': 'Meet a character', 'id': 13 },
        { 'name': 'Movies & Video games', 'id': 14 },
        { 'name': 'Museums & Exhibitions', 'id': 15 },
        { 'name': 'Music & Concerts', 'id': 16 },
        { 'name': 'Puzzles, Blocks & Pretend', 'id': 5 },
        { 'name': 'Science & Technology', 'id': 17 },
        { 'name': 'Seasonal & Special Events', 'id': 18 },
        { 'name': 'Sports & Games', 'id': 19 },
        { 'name': 'Theater & Shows', 'id': 20 },
        { 'name': 'Volunteering', 'id': 7 },
        { 'name': 'Others', 'id': 21 }
    ];

    get_cat_name_by_id(id) {
        let cat_name = '';
        if (id) {
            for (let cat_arr_count = 0; cat_arr_count < this.PRIMARY_CATEGORY.length; cat_arr_count++) {
                const current_cat = this.PRIMARY_CATEGORY[cat_arr_count];
                const current_cat_id = current_cat.id;
                const name = current_cat.name;
                if (current_cat_id == parseInt(id)) {
                    cat_name = name;
                    break;
                }
            }
        }
        return cat_name;
    }
}
