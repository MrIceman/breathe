import {InMemoryRepository} from "../../domain/UserRepository";
import {AsyncStorage} from "react-native";

export class LocalStorage implements InMemoryRepository {
    private static instance: LocalStorage;

    private constructor() {
    }

    public static getInstance() {
        if (this.instance == null)
            this.instance = new LocalStorage();
        return this.instance;
    }

    isAuthTokenPersisted(): Promise<boolean> {
        return new Promise((resolve) => {
            try {
                let result: any = AsyncStorage.getItem('auth_token', (_error, _result) => {
                    resolve(false);
                });
                resolve(result != null);
            } catch (error) {
                resolve(false);
            }
        });
    }

    getAuthToken(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            AsyncStorage.getItem('auth_token').then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    refreshAuthToken(token: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            AsyncStorage.setItem('auth_token', token).then((_success) => {
                resolve(true);
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

}