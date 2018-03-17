import { AuthResponse } from "../auth/model/AuthResponse";
import { ErrorCodes } from "../../model/ErrorCodes";
export class AuthResponseMapper {
    mapErrorCode(errorCode) {
        switch (errorCode) {
            case ErrorCodes.SIGN_IN_FAILED_WRONG_PASSWORD:
                return ErrorCodes.SIGN_IN_FAILED_WRONG_PASSWORD;
            case ErrorCodes.SIGN_IN_FAILED_WRONG_USER:
                return ErrorCodes.SIGN_IN_FAILED_WRONG_USER;
            case ErrorCodes.SIGN_IN_FAILED_BANNED:
                return ErrorCodes.SIGN_IN_FAILED_BANNED;
            default:
                return ErrorCodes.SIGN_IN_FAILED;
        }
    }
    mapEntity(entity) {
        return new AuthResponse(entity.jwtToken, entity.jwtToken !== null, entity.jwtToken === undefined ? this.mapErrorCode(entity.error) : undefined);
    }
}
//# sourceMappingURL=AuthResponseMapper.js.map