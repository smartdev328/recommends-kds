export class RequestBody {
    src: string;
    src_id: string;
}

export class UserRequest extends RequestBody {
    first_name: string;
    last_name: string;
    email: string;

    constructor(requestBody?: RequestBody) {
        super();
        this.src = requestBody.src;
        this.src_id = requestBody.src_id;
    }
}

