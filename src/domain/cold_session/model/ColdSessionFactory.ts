import {ColdSessionRequest} from "../../../model/request/ColdSessionRequest";
import {ColdSessionEntity} from "../../../model/cold_session/ColdSessionEntity";

export class ColdSessionRequestFactory {

    public makeCreateSessionRequest(session: ColdSessionEntity): ColdSessionRequest {
        return new ColdSessionRequest(session.uuid, session.duration, session.notes, session.type,
            'http://localhost:5000/cold/create', 'POST');
    }

}
