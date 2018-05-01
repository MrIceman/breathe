import {SessionGateway} from "../../domain/session/SessionGateway";
import {Session} from "./Session";

export class SessionGatewayImpl implements SessionGateway {
    createSession(amountOfRounds: number, custom: boolean, retentionTimeMap: Map<number, number>, amountOfBreathsPerRetention: Map<number, number>, notes: string): Promise<Session> {
        return undefined;
    }

    getAllSessions(): Promise<Array<Session>> {
        return undefined;
    }

    getSessionById(id: number): Promise<Session> {
        return undefined;
    }

    updateSession(session: Session): Promise<Session> {
        return undefined;
    }

}