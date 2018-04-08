import {Session} from "../data/session/Session";

export interface InMemoryRepository {
    isAuthTokenPersisted(): Promise<boolean>;

    getAuthToken(): Promise<string>;

    refreshAuthToken(token: string): Promise<string>;

    insertSession(session: Session): Promise<Session>;

    updateSession(session: Session): Promise<Session>;

    getAllSessions(): Promise<Array<Session>>;

    getSessionById(id: number): Promise<Session>;

    clearAuthToken(): Promise<boolean>;

}