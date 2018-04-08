import { ErrorResponse } from "../../model/domain/ErrorResponse";
import { ErrorCodes } from "../../utils/Constants";
export class ErrorResponseMapper {
    getErrorMessageByCode(code) {
        let message = '';
        switch (code) {
            case ErrorCodes.SIGN_UP_FAILED_EMAIL_EXISTS:
                message = 'Email already exists. Please pick another one';
                break;
            case ErrorCodes.SIGN_UP_FAILED_USER_EXISTS:
                message = 'Username already exists. Please pick another one';
                break;
        }
        return message;
    }
    mapEntity(entity) {
        return new ErrorResponse(this.getErrorMessageByCode(entity.code), entity.code);
    }
}
//# sourceMappingURL=ErrorResponseMapper.js.map