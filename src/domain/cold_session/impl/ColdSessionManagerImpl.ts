import {ColdSessionManager} from "../ColdSessionManager";
import {ColdSessionEntity} from "../../../model/cold_session/ColdSessionEntity";
import {ColdSessionGateway} from "../ColdSessionGateway";
import {NetworkChecker} from "../../../utils/NetworkChecker";
import {InMemoryRepository} from "../../UserRepository";
import {AuthManager} from "../../auth/AuthManager";
import {ColdSessionRequestFactory} from "../model/ColdSessionFactory";

export class ColdSessionManagerImpl implements ColdSessionManager {

    constructor(private readonly gateway: ColdSessionGateway,
                private readonly repository: InMemoryRepository,
                private readonly networkChecker: NetworkChecker,
                private readonly requestFactory: ColdSessionRequestFactory,
                private readonly authManager: AuthManager) {
    }

    createAndSaveSession(duration: number, type: string, notes: string): Promise<ColdSessionEntity> {
        return new Promise<ColdSessionEntity>((resolve, _reject) => {
            this.repository.persistColdSession(duration, type, notes)
                .then(async (cachedSession: ColdSessionEntity) => {
                    const isDeviceOnline = await this.networkChecker.isDeviceConnected();
                    if (isDeviceOnline) {
                        // Device is connected to the internet, checking now if user is authenticated
                        this.authManager.isAuthenticated().then((_) => {
                            this.createSessionGlobal(cachedSession).then(async (syncedSession) => {
                                this.repository.updateColdSession(syncedSession).then((result) =>
                                    resolve(syncedSession));
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

    createSessionGlobal(localSession: ColdSessionEntity): Promise<ColdSessionEntity> {
        return new Promise<ColdSessionEntity>((resolve, reject) => {
                this.gateway.createSession(this.requestFactory.makeCreateSessionRequest(localSession)).then((entity) => {
                    resolve(entity);
                })
            }
        );
    }

    getAllSessions(): Promise<Array<ColdSessionEntity>> {
        return undefined;
    }

    getSessionById(id: number): Promise<ColdSessionEntity> {
        return undefined;
    }

}