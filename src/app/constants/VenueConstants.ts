export enum ENTITY_TYPES_ENUM {
    EVENT = 'ETYPE_EVENT',
    VENUE = 'ETYPE_VENUE',
    CAMP  = 'ETYPE_CAMPS'
}

export enum TYPES_ENUM {
    VENUE = 'venue',
    EVENT = 'event',
    CAMP = 'camp'
}

export class VenueConstants {
    public GOOGLE_RATING_OUT_OF = 5;
    public PRIMARY_CATEGORY = [
        {'name' : 'Amusement Park' , 'id' : 30100},
        {'name' : 'Arts' , 'id' : 30500},
        {'name' : 'Farms/Ranch/Barn' , 'id' : 31000},
        {'name' : 'Indoor play/park' , 'id' : 31200},
        {'name' : 'Library' , 'id' : 20000},
        {'name' : 'Museum' , 'id' : 31500},
        {'name' : 'Parks & Playgrounds' , 'id' : 10000},
        {'name' : 'Point of Interest' , 'id' : 31700},
        {'name' : 'Sports & Games' , 'id' : 32000},
        {'name' : 'Store' , 'id' : 32100},
        {'name' : 'Theater' , 'id' : 32200},
        {'name' : 'Zoo' , 'id' : 32400},    
    ];

    public SECONDARY_CATEGORY = [
	{'name' : 'Amusement Park' , 'id' : 30100},
        {'name' : 'Arts' , 'id' : 30500},
        {'name' : 'Farms/Ranch/Barn' , 'id' : 31000},
        {'name' : 'Indoor play/park' , 'id' : 31200},
        {'name' : 'Library' , 'id' : 20000},
        {'name' : 'Museum' , 'id' : 31500},
        {'name' : 'Parks & Playgrounds' , 'id' : 10000},
        {'name' : 'Point of Interest' , 'id' : 31700},
        {'name' : 'Sports & Games' , 'id' : 32000},
        {'name' : 'Store' , 'id' : 32100},
        {'name' : 'Theater' , 'id' : 32200},
        {'name' : 'Zoo' , 'id' : 32400},     
    ];

    public TEXT_MAX_LENGTH = 50;

    public TEXT_MIN_LENGTH = 0;

    public PERM_CLOSE = [0 , 1];

    public LOCATIONS = [
        {'name' : 'Berkeley' , 'id' : 13},
        {'name' : 'Campbell' , 'id' :  9},
        {'name' : 'Cupertino' , 'id' :  7},
        {'name' : 'Los Altos' , 'id' :  11},
        {'name' : 'Los Gatos' , 'id' :  12},
        {'name' : 'Menlo Park' , 'id' :  6},
        {'name' : 'Milpitas' , 'id' :  10},
        {'name' : 'Mountain View' , 'id' :  4},
        {'name' : 'Oakland' , 'id' : 15},
        {'name' : 'Palo Alto' , 'id' :  5},
        {'name' : 'San Francisco' , 'id' : 14},
        {'name' : 'San Jose' , 'id' :  1},
        {'name' : 'Santa Clara' , 'id' :  2},
        {'name' : 'Santa Cruz' , 'id' : 16},
        {'name' : 'Saratoga' , 'id' :  8},
        {'name' : 'Sunnyvale' , 'id' :  3},
    ];
}

export class VenueErrorMessage {
    public NO_VENUES_FOUND = "No venues found.";
    public ONLY_CHARACTERS_ALLOWED = " Only charatcters are allowed";
    public LENGTH_IN_BETWEEN = " length should be in between";
    public SOMETHING_WENT_WRONG = " Something went wrong,please try again later";
    public NOT_EMPTY = " should not be an empty value";
    public VALID_EMAIL = " please type valid email address";
    public VALID_ZIP_CODE = " please type valid zip code";
    public VALIDATE_RATING = " rating should be from 1-5" ;
    public VALIDATE_PERM_CLOSE = " should be only 0 OR 1" ;
    public VALIDATE_PRICE = " maximum 10 digit price is allowed" ;
    public VALIDATE_CONTACT_NO = " please type correct contact no Ex:(123)123-1234";
    public VALIDATE_ALPHA_NUMERICS = " only alphanumerics are allowed";
    public VALID_URL = " please type valid URL";
    public VALID_PRICE = " please type valid Price";
    public GET_DATA_ERROR = "Error while getting information";
    public PASS_VENUE_ID_OR_QUERY_SEARCH = "Pass at least venue id or query search";
    public NO_INFO_AVAILABLE = 'No information available for now';
    public PASS_AT_LEAST_ONE_FIELD = "Please provide name & city or venue id or query to get result";
    public VENUE_ID_SHOULD_GREATER_ZERO = 'venue_id should be greater than zero';

}
