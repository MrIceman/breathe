import {SessionManager} from "../SessionManager";
import {Session} from "../../../data/session/Session";
import {SessionGateway} from "../SessionGateway";
import {InMemoryRepository} from "../../UserRepository";
import {SessionFactory} from "../../../data/session/SessionFactory";
import {NetworkChecker} from "../../../utils/NetworkChecker";

export class SessionManagerImpl implements SessionManager {

    constructor(private readonly gateway: SessionGateway, private readonly repository: InMemoryRepository, private readonly networkChecker: NetworkChecker,
                private readonly sessionFactory: SessionFactory) {
    }

    createSessionLocal(amountOfRounds: number,
                       custom: boolean,
                       retentionTimeMap: Map<number, number>,
                       amountOfBreathsPerRetention: Map<number, number>,
                       notes: string): Promise<Session> {

        const session = this.sessionFactory.createNewSession(amountOfRounds, custom, retentionTimeMap, amountOfBreathsPerRetention, notes);
        return new Promise<Session>((resolve, _reject) => {
            this.repository.insertSession(session)
                .then(async (cachedSession: Session) => {
                    const isDeviceOnline = await this.networkChecker.isDeviceConnected();
                    if (isDeviceOnline)
                        this.gateway.createSession(amountOfRounds, custom, retentionTimeMap, amountOfBreathsPerRetention, notes).then((_syncedSession) => {

                        });
                    resolve(cachedSession);
                });
        })
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