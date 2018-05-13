import {SessionEntity} from "../../data/session/SessionEntity";
import {SessionRequest} from "../../model/request/SessionRequest";

export interface SessionGateway {
    getSessionById(id: number): Promise<SessionEntity>;


    createSession(session: SessionRequest): Promise<SessionEntity>;

    updateSession(session: SessionRequest): Promise<SessionEntity>;

    getAllSessions(): Promise<Array<SessionEntity>>;
}