import { AuthResponse } from "../model/AuthResponse";
import { ErrorCodes } from "../../../model/ErrorCodes";
export class AuthManagerImpl {
    constructor(authGateway, repository, responseMapper, errorMapper) {
        this.authGateway = authGateway;
        this.repository = repository;
        this.responseMapper = responseMapper;
        this.errorMapper = errorMapper;
    }
    run(request) {
        return new Promise((resolve, reject) => {
            this.authGateway.signIn(request).then((result) => {
                resolve(this.responseMapper.mapEntity(result));
            }, (error) => {
                reject(error);
            });
        });
    }
    tryAutoLogIn() {
        /**
         * Method to check whether a Token has been persisted before or not.
         * Useful for auto-login
         */
        return new Promise((resolve, reject) => {
            this.repository.isAuthTokenPersisted().then((isPersisted) => {
                resolve(isPersisted);
            })
                .catch((error) => {
                reject(this.errorMapper.mapEntity(error));
            });
        });
    }
    signIn(request) {
        return new Promise((resolve, reject) => {
            this.authGateway.signIn(request).then((result) => {
                let response = this.responseMapper.mapEntity(result);
                resolve(response);
            }, (error) => {
                reject(this.errorMapper.mapEntity(error));
            }).catch((error) => {
                reject(error);
            });
        });
    }
    createAccount(request) {
        return new Promise((resolve, reject) => {
            this.authGateway.register(request).then((result) => {
                resolve(this.responseMapper.mapEntity(result));
            }, (error) => {
                reject(this.errorMapper.mapEntity(error));
            }).catch((error) => {
                console.warn('AuthManagerIMpl throwing error');
                reject(error);
            });
        });
    }
    isPersistedTokenAvailable() {
        return new Promise((resolve, _reject) => {
            this.repository.getAuthToken().then((result) => {
                resolve(new AuthResponse(result, true));
            }, (_error) => {
                resolve(new AuthResponse(undefined, false, ErrorCodes.CHECK_PERSISTED_JWT_FAILED));
            });
        });
    }
    cacheToken(token) {
        return new Promise((resolve, reject) => {
            this.repository.refreshAuthToken(token).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    signOut() {
        return this.authGateway.signOut();
    }
}
//# sourceMappingURL=AuthManagerImpl.js.map