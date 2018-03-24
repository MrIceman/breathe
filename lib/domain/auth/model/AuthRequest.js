import { AbstractRequest } from "../../../model/request/AbstractRequest";
export class AuthRequest extends AbstractRequest {
    constructor(email, password, username) {
        super();
        this.email = email;
        this.password = password;
        this.username = username;
    }
}
//# sourceMappingURL=AuthRequest.js.map