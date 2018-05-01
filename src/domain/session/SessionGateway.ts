import {Session} from "../../data/session/Session";

export interface SessionGateway {
    getSessionById(id: number): Promise<Session>;


    createSession(amountOfRounds: number,
                       custom: boolean,
                       retentionTimeMap: Map<number, number>,
                       amountOfBreathsPerRetention: Map<number, number>,
                       notes: string): Promise<Session>;

    updateSession(session: Session): Promise<Session>;

    getAllSessions(): Promise<Array<Session>>;
}