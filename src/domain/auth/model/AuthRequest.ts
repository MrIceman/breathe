import {AbstractRequest} from "../../../model/request/AbstractRequest";

export class AuthRequest extends AbstractRequest {
    static EMAIL = 'email';
    static PASSWORD = 'password';
    static DISPLAY_NAME = 'username';

    constructor(email: string, password: string, username?: string) {
        super();
        this.data.set(AuthRequest.EMAIL, email);
        this.data.set(AuthRequest.PASSWORD, password);
        if (username != null)
            this.data.set(AuthRequest.DISPLAY_NAME, username);
    }

    get email(): string {
        return this.data.get(AuthRequest.EMAIL);
    }

    get password(): string {
        return this.data.get(AuthRequest.PASSWORD);
    }

    get displayName(): string {
        return this.data.get(AuthRequest.DISPLAY_NAME);
    }
}