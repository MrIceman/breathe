import {ResponseMapper} from "./ResponseMapper";
import {ErrorEntity} from "../../model/entity/ErrorEntity";
import {ErrorResponse} from "../../model/domain/ErrorResponse";

export class ErrorResponseMapper implements ResponseMapper<ErrorEntity, ErrorResponse> {

    private getErrorMessageByCode(code: number): string {
        return '' + code;
    }

    mapEntity(entity: ErrorEntity): ErrorResponse {
        return new ErrorResponse(this.getErrorMessageByCode(entity.code), entity.code);
    }
}