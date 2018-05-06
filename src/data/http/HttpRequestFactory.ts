import {Session} from "../session/Session";
import {HttpRequest} from "../HttpRequest";

export class HttpRequestFactory {
    makeCreateSessionRequest(session: Session) {
        return new HttpRequest('session/create', 'POST', session);
    }
}