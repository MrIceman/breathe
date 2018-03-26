import { ManagerFactory } from "../../domain/ManagerFactory";
export class AuthAction {
    constructor(authManager = ManagerFactory.buildAuthManager()) {
        this.authManager = authManager;
    }
    signIn(email, password) {
        return new Promise((resolve, reject) => {
            this.authManager.signIn(email, password).then((result) => {
                if (result.jwtToken.length > 0)
                    resolve(result.jwtToken);
                else
                    reject(result.errorCode);
            }, (error) => {
                reject(error);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    register(email, password, displayName) {
        return new Promise((resolve, reject) => {
            this.authManager.createAccount(email, password, displayName).then((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }
    isTokenPersisted() {
        return new Promise((resolve, _reject) => {
            this.authManager.isPersistedTokenAvailable().then((_result) => {
                resolve(true);
            }, (_error) => {
                resolve(false);
            }).catch((_error) => {
                resolve(false);
            });
        });
    }
    persistToken(token) {
        return new Promise((resolve, reject) => {
            this.authManager.cacheToken(token).then((result) => {
                if (result.length > 0)
                    resolve(true);
                else
                    reject(false);
            }, (error) => {
                reject(error);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}
//# sourceMappingURL=AuthAction.js.map