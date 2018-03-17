import { AbstractRequest } from "../../../model/request/AbstractRequest";
export class AuthRequest extends AbstractRequest {
    constructor(email, password, username) {
        super();
        this.data.set(AuthRequest.EMAIL, email);
        this.data.set(AuthRequest.PASSWORD, password);
        if (username != null)
            this.data.set(AuthRequest.DISPLAY_NAME, username);
    }
    get email() {
        return this.data.get(AuthRequest.EMAIL);
    }
    get password() {
        return this.data.get(AuthRequest.PASSWORD);
    }
    get displayName() {
        return this.data.get(AuthRequest.DISPLAY_NAME);
    }
}
AuthRequest.EMAIL = 'email';
AuthRequest.PASSWORD = 'password';
AuthRequest.DISPLAY_NAME = 'username';
//# sourceMappingURL=AuthRequest.js.map