import {Response} from "../model/response/Response";
import {AbstractRequest} from "../model/request/AbstractRequest";

export interface UseCase {
    run(request: AbstractRequest): Promise<Response>;
}