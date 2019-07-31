import { VenueConstants, VenueErrorMessage } from '../constants/VenueConstants';
import { CampConstants, CampErrorMessage } from '../constants/CampConstants';
import { UserSearch } from '../../venue/venue.model';
import { CampModel } from '../../camp/add-camp/camp.model';
export class ValidationRules {

    public CAMP_REQUIRED_FIELDS = ['name', 'description', 'url', 'image_url', 'cities',
        'am_extended_care', 'pm_extended_care', 'lunch', 'timings', 'tips'];

    public venueConstatnts = new VenueConstants();
    public venueErrorMessage = new VenueErrorMessage();
    public campErrorMessage = new CampErrorMessage();

    public validate_only_characters(text: any) {
        return /^[a-z A-Z 0-9 ' "\:/.,!]+$/.test(text);
    }

    public validate_only_alphanumeric(text: any) {
        return /^[a-z A-Z0-9$@'"]+$/.test(text);
    }

    public validate_url(URL: any) {
        return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(URL);
    }

    public validate_email(email: any) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    public validate_float_value(decimal_value: any) {
        return parseFloat(decimal_value) > 0 && parseFloat(decimal_value) < 6;
        // return /^[1-5]+\.[1-5]+$/.test(decimal_value);
    }

    public validate_us_zip_code(zip_code: any) {
        return /^\d{5}(?:[-\s]\d{4})?$/.test(zip_code);
    }

    public validate_text_length(text: any) {
        return text.length > this.venueConstatnts.TEXT_MIN_LENGTH && text.length < this.venueConstatnts.TEXT_MAX_LENGTH;
    }

    public validate_contact_no(contact: string) {
        return /^[0-9()+-_ ]+$/.test(contact);
        // return /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(contact);

    }
    public validate_only_zero_and_one(no: string) {
        return /^[0 1]+$/.test(no);

    }
    public validate_price(no: string) {
        return /^\d{0,10}(\.\d{1,4})?$/.test(no);
    }

    validate_basic_venue_fields(user_search: UserSearch) {
        if (user_search.name === undefined || user_search.name.trim().length === 0) {
            return 'name , ' + this.venueErrorMessage.NOT_EMPTY;
        } else if (user_search.city === undefined || user_search.city.trim().length === 0) {
            return 'city , ' + this.venueErrorMessage.NOT_EMPTY;
        } else if (user_search.state === undefined || user_search.state.trim().length === 0) {
            return 'state , ' + this.venueErrorMessage.NOT_EMPTY;
        } else if (this.validate_text_length(user_search.name) === false) {
            return 'name ' + this.venueErrorMessage.LENGTH_IN_BETWEEN + this.venueConstatnts.TEXT_MIN_LENGTH + ' & ' +
                this.venueConstatnts.TEXT_MAX_LENGTH;
        } else if (this.validate_text_length(user_search.city) === false) {
            return 'city ' + this.venueErrorMessage.LENGTH_IN_BETWEEN + this.venueConstatnts.TEXT_MIN_LENGTH + ' & ' +
                this.venueConstatnts.TEXT_MAX_LENGTH;
        } else if (this.validate_text_length(user_search.state) === false) {
            return 'state ' + this.venueErrorMessage.LENGTH_IN_BETWEEN + this.venueConstatnts.TEXT_MIN_LENGTH + ' & ' +
                this.venueConstatnts.TEXT_MAX_LENGTH;
        } else if (this.validate_only_characters(user_search.name) === false) {
            return 'name :' + this.venueErrorMessage.ONLY_CHARACTERS_ALLOWED;
        } else if (this.validate_only_characters(user_search.city) === false) {
            return 'city :' + this.venueErrorMessage.ONLY_CHARACTERS_ALLOWED;
        } else if (this.validate_only_characters(user_search.state) === false) {
            return 'state :' + this.venueErrorMessage.ONLY_CHARACTERS_ALLOWED;
        } else {
            return true;
        }
    }

    camp_required_field_must_not_be_blank(campModel: CampModel) {
        const final_errors = [];
        for (let field_counter = 0; field_counter < this.CAMP_REQUIRED_FIELDS.length; field_counter++) {
            const each_field = this.CAMP_REQUIRED_FIELDS[field_counter];

            if (each_field in campModel['misc']) {

                if (campModel['misc'][each_field].trim() == '') {
                    final_errors.push(each_field + ' : ' + this.campErrorMessage.NOT_BLANK);
                }

            } else if (campModel[each_field].trim() == '') {

                final_errors.push(each_field + ' : ' + this.campErrorMessage.NOT_BLANK);
            }
        }
        return final_errors;
    }
    validate_age(min_age, max_age) {

        const final_errors = [];
        if (min_age.toString().length >= 3) {
            final_errors.push(this.campErrorMessage.MIN_AGE);
        }

        if (max_age.toString().length >= 3) {
            final_errors.push(this.campErrorMessage.MAX_AGE);
        }

        return final_errors;
    }


}
