import { RequestBody } from "@shared/model/request-body";

export class CommonUtil {
    public static initRequestBody() {
        const body = new RequestBody();
        body.src = 'web';
        body.src_id = Math.floor(Math.random() * (999999 - 100000)) + 100000 + '';
        return body;
    }
}