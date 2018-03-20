import {Session} from "./Session";

export class SessionMapper {
    mapSession(data: any): Session {
        return JSON.parse((data)) as Session;
    }
}