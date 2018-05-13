import {Session} from "../../domain/session/model/Session";

export class SessionMapper {
    mapSession(data: any): Session {
        return JSON.parse((data)) as Session;
    }
}