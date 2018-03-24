import {SessionManager} from "../SessionManager";
import {Session} from "../../../data/session/Session";
import {SessionGateway} from "../SessionGateway";

export class SessionManagerImpl implements SessionManager {

    constructor(private readonly gateway: SessionGateway, ) {
    }

    createSessionLocal(amountOfRounds: number,
                       custom: boolean,
                       retentionTimeMap: Map<number, number>,
                       amountOfBreathsPerRetention: Map<number, number>,
                       notes: string): Promise<Session> {
        return this.gateway.createSession(amountOfRounds, custom, retentionTimeMap, amountOfBreathsPerRetention, notes);
    }

    getAllSessions(): Promise<Array<Session>> {
        return undefined;
    }

    getSessionByDetail(id: number): Promise<Session> {
        id.toString();
        return undefined;
    }

    syncSessionGlobal(session: Session): Promise<Session> {
        return new Promise<Session>((resolve, _reject) => {
            resolve(session);
        });
    }

}