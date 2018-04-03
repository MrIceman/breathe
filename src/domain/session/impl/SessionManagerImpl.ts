import {SessionManager} from "../SessionManager";
import {Session} from "../../../data/session/Session";
import {SessionGateway} from "../SessionGateway";
import {InMemoryRepository} from "../../UserRepository";
import {SessionFactory} from "../../../data/session/SessionFactory";
import {NetworkChecker} from "../../../utils/NetworkChecker";
import {AuthManager} from "../../auth/AuthManager";

export class SessionManagerImpl implements SessionManager {

    constructor(private readonly gateway: SessionGateway, private readonly repository: InMemoryRepository, private readonly networkChecker: NetworkChecker,
                private readonly sessionFactory: SessionFactory,
                private readonly authManager: AuthManager) {
    }

    createSession(amountOfRounds: number,
                  custom: boolean,
                  retentionTimeMap: Map<number, number>,
                  amountOfBreathsPerRetention: Map<number, number>,
                  notes: string): Promise<Session> {

        const session = this.sessionFactory.createNewSession(amountOfRounds, custom, retentionTimeMap, amountOfBreathsPerRetention, notes);
        return new Promise<Session>((resolve, _reject) => {
            this.repository.insertSession(session)
                .then(async (cachedSession: Session) => {
                    const isDeviceOnline = await this.networkChecker.isDeviceConnected();
                    if (isDeviceOnline) {
                        // Device is connected to the internet, checking now if user is authenticated
                        this.authManager.isAuthenticated().then((_cacheResolve) => {
                            this.createSessionGlobal(cachedSession).then(async (syncedSession) => {
                                await this.repository.updateSession(syncedSession);
                                resolve(syncedSession);
                            }, (_) => {
                                resolve(cachedSession);
                            });
                        }, (_) => {
                            resolve(cachedSession);
                        });
                    } else
                        resolve(cachedSession);
                });
        })
    }

    getAllSessions(): Promise<Array<Session>> {
        return undefined;
    }

    getSessionById(id: number): Promise<Session> {
        id.toString();
        return undefined;
    }

    createSessionGlobal(session: Session): Promise<Session> {
        return this.gateway.createSession(session.amountOfRounds, session.custom, session.retentionTimeMap, session.amountOfBreathsPreRetention, session.notes);
    }

}