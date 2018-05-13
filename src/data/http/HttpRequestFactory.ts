import {HttpRequest} from "../HttpRequest";
import {Session} from "../../domain/session/model/Session";

export class HttpRequestFactory {
    makeCreateSessionRequest(session: Session): HttpRequest {
        return new HttpRequest('session/create', 'POST', session);
    }
}