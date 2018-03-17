export class AuthResponse {
    constructor(jwtToken = '', successful, errorCode) {
        this.jwtToken = jwtToken;
        this.successful = successful;
        this.errorCode = errorCode;
    }
}
//# sourceMappingURL=AuthResponse.js.map