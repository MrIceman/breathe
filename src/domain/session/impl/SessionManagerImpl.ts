import {SessionManager} from "../SessionManager";
import {SessionGateway} from "../SessionGateway";
import {InMemoryRepository} from "../../UserRepository";
import {SessionFactory} from "../model/SessionFactory";
import {NetworkChecker} from "../../../utils/NetworkChecker";
import {AuthManager} from "../../auth/AuthManager";
import {Session} from "../model/Session";

export class SessionManagerImpl implements SessionManager {

    constructor(private readonly gateway: SessionGateway,
                private readonly repository: InMemoryRepository,
                private readonly networkChecker: NetworkChecker,
                private readonly sessionFactory: SessionFactory,
                private readonly authManager: AuthManager) {
    }

    createAndSaveSession(amountOfRounds: number,
                         custom: boolean,
                         retentionTimeMap: Map<number, number>,
                         amountOfBreathsPerRetention: Map<number, number>,
                         notes: string): Promise<Session> {

        const session = this.sessionFactory.createNewSession(amountOfRounds, custom, retentionTimeMap, amountOfBreathsPerRetention, notes);
        return new Promise<Session>((resolve, _reject) => {
            this.repository.insertLocalSession(session)
                .then(async (cachedSession: Session) => {
                    const isDeviceOnline = await this.networkChecker.isDeviceConnected();
                    if (isDeviceOnline) {
                        // Device is connected to the internet, checking now if user is authenticated
                        this.authManager.isAuthenticated().then((_) => {
                            this.createSessionGlobal(cachedSession).then(async (syncedSession) => {
                                await this.repository.updateLocalSession(syncedSession);
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

    async getAllSessions(): Promise<Array<Session>> {
        return new Promise<Array<Session>>(async (resolve, _reject) => {
            const isDeviceOnline = await this.networkChecker.isDeviceConnected();
            const isUserAuthenticated = await this.authManager.isAuthenticated();
            if (isDeviceOnline && isUserAuthenticated) {
                this.gateway.getAllSessions().then((entities) => {
                    const sessions: Array<Session> = entities.map((entity) => this.sessionFactory.parseEntityToModel(entity));
                    resolve(sessions);
                });
            } else {
                const result = await this.repository.getAllLocalSessions();
                resolve(result);
            }

        });
    }

    getSessionById(id: number): Promise<Session> {
        id.toString();
        return undefined;
    }

    createSessionGlobal(session: Session): Promise<Session> {
        return new Promise<Session>((resolve, reject) => {
                this.gateway.createSession(this.sessionFactory.makeSessionRequest(session)).then((entity) => {
                    resolve(this.sessionFactory.parseEntityToModel(entity));
                })
            }
        );
    }

    /*
    private async shouldLoadFromBackend(): boolean {
        const isDeviceOnline = await this.networkChecker.isDeviceConnected();
        const isUserAuthenticated = await this.controller.isAuthenticated();
        return isDeviceOnline && isUserAuthenticated;
    } */
}