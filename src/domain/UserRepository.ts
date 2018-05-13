import {SessionGateway} from "./session/SessionGateway";
import {Session} from "./session/model/Session";

export interface InMemoryRepository extends SessionGateway {
    isAuthTokenPersisted(): Promise<boolean>;

    getAuthToken(): Promise<string>;

    refreshAuthToken(token: string): Promise<string>;

    cacheUsername(username: string): Promise<string>;

    getUsername(): Promise<string>;

    insertLocalSession(session: Session): Promise<Session>;

    updateLocalSession(session: Session): Promise<Session>;

    getAllLocalSessions(): Promise<Array<Session>>;

    getLocalSessionById(id: number): Promise<Session>;

    clearAuthToken(): Promise<boolean>;

}