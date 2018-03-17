import { AsyncStorage } from "react-native";
export class LocalStorage {
    constructor() {
    }
    static getInstance() {
        if (this.instance == null)
            this.instance = new LocalStorage();
        return this.instance;
    }
    isAuthTokenPersisted() {
        return new Promise((resolve) => {
            try {
                let result = AsyncStorage.getItem('auth_token', (_error, _result) => {
                    resolve(false);
                });
                resolve(result != null);
            }
            catch (error) {
                resolve(false);
            }
        });
    }
    getAuthToken() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('auth_token').then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    refreshAuthToken(token) {
        return new Promise((resolve, reject) => {
            AsyncStorage.setItem('auth_token', token).then((_success) => {
                resolve(true);
            }).catch((_error) => {
                reject(false);
            });
        });
    }
    insertSession(session) {
        session.toString();
        return undefined;
    }
    getAllSessions() {
        return undefined;
    }
}
//# sourceMappingURL=LocalStorage.js.map