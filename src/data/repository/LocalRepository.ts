import {InMemoryRepository} from "../../domain/UserRepository";
import {LocalDataSourceImpl} from "./LocalDataSourceImpl";
import {LocalDataSource} from "./LocalDataSource";
import {Constants} from "../../utils/Constants";
import {Session} from "../session/Session";
import {SessionMapper} from "../session/SessionMapper";

export class LocalRepository implements InMemoryRepository {
    private static instance: LocalRepository;
    private source: LocalDataSource;
    private mapper: SessionMapper;

    private constructor(storage: LocalDataSource, sessionMapper: SessionMapper) {
        this.source = storage;
        this.mapper = sessionMapper;
    }

    public static getInstance() {
        if (this.instance == null)
            this.instance = new LocalRepository(new LocalDataSourceImpl(), new SessionMapper());
        return this.instance;
    }

    public static getNewInstanceWithDataSource(testingDataSource: LocalDataSource, sessionMapper: SessionMapper) {
        this.instance = new LocalRepository(testingDataSource, sessionMapper);
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

    insertSession(session: Session): Promise<Session> {
        return new Promise<Session>(async (resolve, _reject) => {
            this.addSessionIdToMap(session.id).then((_) => {
                this.source.setItem('local_' + session.id, session.toJSONString()).then((_) => {
                    resolve(session);
                })
            });
        });
    }

    public addSessionIdToMap(id: number): Promise<string> {
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

    getAllSessions(): Promise<Array<Session>> {
        return new Promise<Array<Session>>(async (resolve, reject) => {
            const result = [];

            await this.getPersistedSessionIds().then((persistedIds: Array<string>) => {
                for (const id of persistedIds) {
                    this.getSessionById(Number(id)).then((session) => {
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

    getSessionById(id: number): Promise<Session> {
        return new Promise<Session>((resolve, _) => {
            this.source.getItem('local_' + id).then((result) => {
                const session = this.mapper.mapSession(result);
                resolve(session);
            });
        });
    }

    clearAuthToken(): Promise<boolean> {
        return new Promise<boolean>(async (resolve, _reject) => {
            await this.refreshAuthToken('');
            resolve(true);
        });
    }

    updateSession(session: Session): Promise<Session> {
        return this.insertSession(session);
    }

    cacheUsername(username: string): Promise<string> {
        return this.source.setItem(Constants.USERNAME_CACHE_KEY, username);
    }

    getUsername(): Promise<string> {
        return this.source.getItem(Constants.USERNAME_CACHE_KEY);
    }

}