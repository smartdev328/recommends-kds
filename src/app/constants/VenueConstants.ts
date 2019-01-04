
export class VenueConstants {
    public GOOGLE_RATING_OUT_OF = 5;
    public PRIMARY_CATEGORY = [
        {'id' : 10000 , 'name' : 'Parks & Playgrounds' },
        {'id' : 20000 , 'name' : 'Library' },
        {'id' : 30000 , 'name' : 'Amusement park' },
        {'id' : 30100 , 'name' : 'Aquarium' },
        {'id' : 30200 , 'name' : 'Arcade' },
        {'id' : 30400 , 'name' : 'Arts ' },
        {'id' : 30500 , 'name' : 'Community Center' },
        {'id' : 30600 , 'name' : 'Community Garden' },
        {'id' : 30700 , 'name' : 'Community Pool' },
        {'id' : 30800 , 'name' : 'Community Sports Center' },
        {'id' : 30900 , 'name' : 'Farms/Barn/Ranch' },
        {'id' : 31000 , 'name' : 'Garden' },
        {'id' : 31100 , 'name' : 'Indoor play/park' },
        {'id' : 31200 , 'name' : 'Lakes' },
        {'id' : 31300 , 'name' : 'Learning Center' },
        {'id' : 31400 , 'name' : 'Museum' },
        {'id' : 31500 , 'name' : 'Planetarium' },
        {'id' : 31600 , 'name' : 'Point of Interest' },
        {'id' : 31700 , 'name' : 'Shopping Center with play area' },
        {'id' : 31800 , 'name' : 'Skate Park' },
        {'id' : 31900 , 'name' : 'Sports & Games' },
        {'id' : 32000 , 'name' : 'Store' },
        {'id' : 32100 , 'name' : 'Theater ' },
        {'id' : 32200 , 'name' : 'Water park' },
        {'id' : 32300 , 'name' : 'Zoo' },
        {'id' : 32400 , 'name' : 'Hiking/National & State Parks' },
        {'id' : 32400 , 'name' : 'Campgrounds/National & State Parks' },
        {'id' : 32400 , 'name' : 'Beach' },
        {'id' : 40100 , 'name' : 'Classes & Camps' },
        {'id' : 40200 , 'name' : 'Food' },
        {'id' : 40300 , 'name' : 'Daycares & Schools',}
        ];

    public SECONDARY_CATEGORY = [
        {'id' : 10000 , 'name' : 'Parks & Playgrounds' },
        {'id' : 20000 , 'name' : 'Library' },
        {'id' : 30000 , 'name' : 'Amusement park' },
        {'id' : 30100 , 'name' : 'Aquarium' },
        {'id' : 30200 , 'name' : 'Arcade' },
        {'id' : 30400 , 'name' : 'Arts ' },
        {'id' : 30500 , 'name' : 'Community Center' },
        {'id' : 30600 , 'name' : 'Community Garden' },
        {'id' : 30700 , 'name' : 'Community Pool' },
        {'id' : 30800 , 'name' : 'Community Sports Center' },
        {'id' : 30900 , 'name' : 'Farms/Barn/Ranch' },
        {'id' : 31000 , 'name' : 'Garden' },
        {'id' : 31100 , 'name' : 'Indoor play/park' },
        {'id' : 31200 , 'name' : 'Lakes' },
        {'id' : 31300 , 'name' : 'Learning Center' },
        {'id' : 31400 , 'name' : 'Museum' },
        {'id' : 31500 , 'name' : 'Planetarium' },
        {'id' : 31600 , 'name' : 'Point of Interest' },
        {'id' : 31700 , 'name' : 'Shopping Center with play area' },
        {'id' : 31800 , 'name' : 'Skate Park' },
        {'id' : 31900 , 'name' : 'Sports & Games' },
        {'id' : 32000 , 'name' : 'Store' },
        {'id' : 32100 , 'name' : 'Theater ' },
        {'id' : 32200 , 'name' : 'Water park' },
        {'id' : 32300 , 'name' : 'Zoo' },
        {'id' : 32400 , 'name' : 'Hiking/National & State Parks' },
        {'id' : 32400 , 'name' : 'Campgrounds/National & State Parks' },
        {'id' : 32400 , 'name' : 'Beach' },
        {'id' : 40100 , 'name' : 'Classes & Camps' },
        {'id' : 40200 , 'name' : 'Food' },
        {'id' : 40300 , 'name' : 'Daycares & Schools',}
    ];

    public TEXT_MAX_LENGTH = 50;

    public TEXT_MIN_LENGTH = 0;

    public PERM_CLOSE = [0 , 1];
}

export class VenueErrorMessage {
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

}
