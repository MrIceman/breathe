import {Session} from "../../data/session/Session";

export interface SessionGateway {
    getSessionById(id: number): Promise<Session>;


    createSession(session: Session): Promise<Session>;

    updateSession(session: Session): Promise<Session>;

    getAllSessions(): Promise<Array<Session>>;
}