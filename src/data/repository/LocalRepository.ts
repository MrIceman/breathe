import {InMemoryRepository} from "../../domain/UserRepository";
import {LocalDataSourceImpl} from "./LocalDataSourceImpl";
import {LocalDataSource} from "./LocalDataSource";
import {Constants} from "../../utils/Constants";

export class LocalRepository implements InMemoryRepository {

    private static instance: LocalRepository;
    private source: LocalDataSource;

    private constructor(storage: LocalDataSource) {
        this.source = storage;
    }

    public static getInstance() {
        if (this.instance == null)
            this.instance = new LocalRepository(new LocalDataSourceImpl());
        return this.instance;
    }

    public static getNewInstanceWithDataSource(testingDataSource: LocalDataSource) {
        this.instance = new LocalRepository(testingDataSource);
        return this.instance;
    }

    isAuthTokenPersisted(): Promise<boolean> {
        return new Promise<boolean>((resolve, _reject) => {
            this.source.getItem(Constants.JWT_TOKEN_KEY).then((result) => {
                resolve(result !== null);
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

    insertSession(session: {}): Promise<boolean> {
        session.toString();
        return undefined;
    }

    getAllSessions(): Promise<Array<{}>> {
        return undefined;
    }

    invalidateSession(): Promise<boolean> {
        return undefined;
    }

}