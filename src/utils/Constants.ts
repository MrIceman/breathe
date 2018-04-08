export class Constants {
    public static JWT_TOKEN_KEY: string = 'jwt_token';
    public static SESSION_ID_MAP: string = 'session_ids';
}

export class ErrorCodes {
    public static readonly INVALID_INPUT = 0;
    public static readonly AUTH_TOKEN_MISSING = 1;
    public static readonly AUTH_TOKEN_INVALID = 2;
    public static readonly SIGN_UP_FAILED_EMAIL_EXISTS = 20;
    public static readonly SIGN_UP_FAILED_USER_EXISTS = 21;

}