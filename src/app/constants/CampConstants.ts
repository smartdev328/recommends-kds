
export class CampConstants {

    public CAMP_CATEGORY = [
                                {"name" : "Science" , "id" :  10000},
                                {"name" : "STEAM" , "id" :  11000},
                                {"name" : "Sports" , "id" :  12000},
                                {"name" : "Adventure" , "id" :  13000},
                                {"name" : "Theatre" , "id" :  14000},
                                {"name" : "Technology" , "id" :  15000},
                                {"name" : "Arts" , "id" :  16000},
                                {"name" : "Chess" , "id" :  17000},
                                {"name" : "Lego" , "id" :  18000}
                            ];

}

export class CampErrorMessage {
    public NOT_BLANK = "Field can't be blank";
    public MIN_AGE = "Min. age should not be greater than 99";
    public MAX_AGE = "Max. age should not be greater than 99";
    public ERROR_ADDING_NEW_REVIEW = "Error while adding a new review";
    public SOMETHING_WENT_WRONG = " Something went wrong, please try again later";
    public GET_DATA_ERROR = "Error while getting information";
    public REVIEW_ADDED_SUCCESS = "Review , successfully added";

}