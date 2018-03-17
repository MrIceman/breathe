import { ErrorResponse } from "../../model/domain/ErrorResponse";
export class ErrorResponseMapper {
    getErrorMessageByCode(code) {
        return '' + code;
    }
    mapEntity(entity) {
        return new ErrorResponse(this.getErrorMessageByCode(entity.code), entity.code);
    }
}
//# sourceMappingURL=ErrorResponseMapper.js.map