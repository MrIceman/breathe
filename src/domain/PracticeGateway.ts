import {Entity} from "../model/entity/Entity";
import {HttpRequest} from "../data/HttpRequest";

export interface PracticeGateway<ENTITY extends Entity, REQUEST extends HttpRequest> {
    getSessionById(id: string): Promise<ENTITY>;

    createSession(session: REQUEST): Promise<ENTITY>;

    updateSession(session: REQUEST): Promise<ENTITY>;

    getAllSessions(): Promise<Array<ENTITY>>;
}