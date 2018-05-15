import {InMemoryRepository} from "../../domain/UserRepository";
import {LocalDataSourceImpl} from "./LocalDataSourceImpl";
import {LocalDataSource} from "./LocalDataSource";
import {Constants} from "../../utils/Constants";
import {SessionEntityMapper} from "./SessionEntityMapper";
import {SessionRequest} from "../../model/request/SessionRequest";
import {SessionEntity} from "../../model/session/SessionEntity";
import {SessionEntityFactory} from "../../model/session/SessionEntityFactory";
import {UUIDBuilder} from "./UUIDBuilder";
import {DeviceManager} from "../../utils/DeviceManager";

export class LocalRepository implements InMemoryRepository {
    private static instance: LocalRepository;
    private source: LocalDataSource;
    private mapper: SessionEntityMapper;

    private constructor(storage: LocalDataSource, sessionMapper: SessionEntityMapper, sessionEntityFactory: SessionEntityFactory) {
        this.source = storage;
        this.mapper = sessionMapper;
    }

    public static getInstance() {
        if (this.instance == null)
            this.instance = new LocalRepository(new LocalDataSourceImpl(), new SessionEntityMapper(),
                new SessionEntityFactory(new UUIDBuilder(new DeviceManager())));
        return this.instance;
    }

    /**
     * Use this Method only for testing purpose
     * @param {LocalDataSource} testingDataSource
     * @param {SessionEntityMapper} sessionMapper
     * @param {SessionEntityFactory} sessionEntityFactory
     * @returns {LocalRepository}
     */
    public static makeInstance(testingDataSource: LocalDataSource, sessionMapper: SessionEntityMapper, sessionEntityFactory: SessionEntityFactory) {
        this.instance = new LocalRepository(testingDataSource, sessionMapper, sessionEntityFactory);
        return this.instance;
    }

    isAuthTokenPersisted(): Promise<boolean> {
        return new Promise<boolean>((resolve, _reject) => {
            this.source.getItem(Constants.JWT_TOKEN_KEY).then((result) => {
                resolve(result.length > 0);
            }, (_) => {
                resolve(false);
            }).catch((_) => {
                resolve(false);
            })
        });
    }

    getAuthToken(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.source.getItem(Constants.JWT_TOKEN_KEY).then((result) => {
                if (result === undefined || result.length == 0)
                    reject();
                else
                    resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    refreshAuthToken(token: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.source.setItem(Constants.JWT_TOKEN_KEY, token).then((result) => {
                resolve(result);
            }).catch((_error) => {
                reject(false);
            })

        });
    }

    clearAuthToken(): Promise<boolean> {
        return new Promise<boolean>(async (resolve, _reject) => {
            await this.refreshAuthToken('');
            resolve(true);
        });
    }

    insertSessionEntity(sessionEntity: SessionEntity): Promise<SessionEntity> {
        return new Promise<SessionEntity>(async (resolve, _reject) => {
            this.addSessionIdToMap(sessionEntity.uuid).then((_) => {
                this.source.setItem(sessionEntity.uuid, sessionEntity.toJSONString()).then((_) => {
                    resolve(sessionEntity);
                })
            });
        });
    }

    public addSessionIdToMap(id: string): Promise<string> {
        return new Promise<string>((resolve, _reject) => {
            const currentPersistedIds: Array<string> = [];

            this.source.getItem(Constants.SESSION_ID_MAP).then(async (result) => {

                if (result != undefined && result.length > 0) {
                    const currentIds: Array<string> = result.split(',');
                    currentPersistedIds.push(...currentIds);
                }
                if (currentPersistedIds.indexOf(id + '') === -1)
                    currentPersistedIds.push(id + '');

                const arrayString = currentPersistedIds.join();
                await this.source.setItem(Constants.SESSION_ID_MAP, arrayString);

                resolve(arrayString);
            });
        });
    }

    getAllPersistedSessionEntities(): Promise<Array<SessionEntity>> {
        return new Promise<Array<SessionEntity>>(async (resolve, reject) => {
            const result = [];

            await this.getPersistedSessionIds().then((persistedIds: Array<string>) => {
                for (const id of persistedIds) {
                    this.getSessionById(id).then((session) => {
                        result.push(session);
                    })
                }
            }, (_error) => {
                reject([]);
            }).catch(() => {
                resolve([]);
            });
            resolve(result);
        });
    }

    getPersistedSessionIds(): Promise<Array<string>> {
        return new Promise<Array<string>>((resolve, reject) => {
            this.source.getItem(Constants.SESSION_ID_MAP).then((result) => {
                const sessionIdArray: Array<string> = result.split(',');
                resolve(sessionIdArray);
            }, (_error) => {
                reject([]);
            }).catch(() => {
                resolve([]);
            })
        });
    }

    getSessionById(id: string): Promise<SessionEntity> {
        return new Promise<SessionEntity>((resolve, _) => {
            this.source.getItem(id).then((result) => {
                const session = this.mapper.mapSession(result);
                resolve();
            });
        });
    }

    updateLocalSession(session: SessionEntity): Promise<SessionEntity> {
        return undefined; // this.insertSessionEntity(session);
    }

    cacheUsername(username: string): Promise<string> {
        return this.source.setItem(Constants.USERNAME_CACHE_KEY, username);
    }

    getUsername(): Promise<string> {
        return this.source.getItem(Constants.USERNAME_CACHE_KEY);
    }

    createSession(session: SessionRequest): Promise<SessionEntity> {
        return undefined;
    }

    getAllLocalSessions(): Promise<Array<SessionEntity>> {
        return undefined;
    }

    getAllSessions(): Promise<Array<SessionEntity>> {
        return undefined;
    }

    getLocalSessionById(id: number): Promise<SessionEntity> {
        return undefined;
    }

    persistSession(amountOfRounds: number, custom: boolean, retentionTimeMap: Map<number, number>,
                   amountOfBreathsPerRetention: Map<number, number>, notes: string): Promise<SessionEntity> {
        return undefined;
    }

    updateSession(session: SessionRequest): Promise<SessionEntity> {
        return undefined;
    }
}