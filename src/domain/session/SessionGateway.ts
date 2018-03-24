import {Session} from "../../data/session/Session";

export interface SessionGateway {
    getSessionById()

    createSession(amountOfRounds: number,
                       custom: boolean,
                       retentionTimeMap: Map<number, number>,
                       amountOfBreathsPerRetention: Map<number, number>,
                       notes: string): Promise<Session>;

    createSessionGlobal(session: Session): Session;
}