import {SessionGateway} from "./session/SessionGateway";
import {SessionEntity} from "../model/session/SessionEntity";

export interface InMemoryRepository extends SessionGateway {
    isAuthTokenPersisted(): Promise<boolean>;

    getAuthToken(): Promise<string>;

    refreshAuthToken(token: string): Promise<string>;

    cacheUsername(username: string): Promise<string>;

    getUsername(): Promise<string>;

    persistSession(amountOfRounds, custom, retentionTimeMap, amountOfBreathsPerRetention, notes): Promise<SessionEntity>;

    updateLocalSession(session: SessionEntity): Promise<SessionEntity>;

    getAllLocalSessions(): Promise<Array<SessionEntity>>;

    getLocalSessionById(id: number): Promise<SessionEntity>;

    clearAuthToken(): Promise<boolean>;

}