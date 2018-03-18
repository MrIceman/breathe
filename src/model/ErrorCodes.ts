export class ErrorCodes {
    //equivalent to Backend
    public static SIGN_UP_FAILED: number = 1;
    public static SIGN_IN_FAILED: number = 2;
    public static SIGN_IN_FAILED_WRONG_PASSWORD: number = 3;
    public static SIGN_IN_FAILED_WRONG_USER: number = 4;
    public static SIGN_IN_FAILED_BANNED: number = 5;
    public static CHECK_PERSISTED_JWT_FAILED: number = 6;

    public static INTERNAL_ERROR = -1;
}