import {AuthGateway} from "../AuthGateway";
import {UseCase} from "../../UseCase";
import {AuthResponse} from "../model/AuthResponse";
import {AuthRequest} from "../model/AuthRequest";
import {AuthEntity} from "../../../model/entity/AuthEntity";
import {InMemoryRepository} from "../../UserRepository";
import {AuthManager} from "../AuthManager";
import {AuthResponseMapper} from "../../common/AuthResponseMapper";
import {ErrorCodes} from "../../../model/ErrorCodes";
import {ErrorResponseMapper} from "../../common/ErrorResponseMapper";

export class AuthManagerImpl implements UseCase, AuthManager {

    public constructor(private authGateway: AuthGateway,
                       private repository: InMemoryRepository,
                       private responseMapper: AuthResponseMapper,
                       private errorMapper: ErrorResponseMapper) {
    }

    run(request: AuthRequest): Promise<AuthResponse> {
        return new Promise<AuthResponse>((resolve, reject) => {
            this.authGateway.signIn(request).then((result: AuthEntity) => {
                resolve(this.responseMapper.mapEntity(result));
            }, (error) => {
                reject(error);
            })
        });
    }

    tryAutoLogIn(): Promise<boolean> {
        /**
         * Method to check whether a Token has been persisted before or not.
         * Useful for auto-login
         */
        return new Promise<boolean>((resolve, reject) => {
            this.repository.isAuthTokenPersisted().then((isPersisted) => {
                resolve(isPersisted);
            })
                .catch((error) => {
                    reject(this.errorMapper.mapEntity(error));
                })
        });
    }

    signIn(request: AuthRequest): Promise<AuthResponse> {
        return new Promise<AuthResponse>((resolve, reject) => {
            this.authGateway.signIn(request).then((result: AuthEntity) => {
                let response: AuthResponse = this.responseMapper.mapEntity(result);
                resolve(response);
            }, (error) => {
                reject(this.errorMapper.mapEntity(error));
            }).catch((error: string) => {
                reject(error);
            });
        });
    }

    createAccount(request: AuthRequest): Promise<AuthResponse> {
        return new Promise<AuthResponse>((resolve, reject) => {
            this.authGateway.register(request).then((result: AuthEntity) => {
                resolve(this.responseMapper.mapEntity(result));
            }, (error) => {
                reject(this.errorMapper.mapEntity(error));
            }).catch((error: string) => {
                console.warn('AuthManagerIMpl throwing error');
                reject(error);
            });
        });
    }

    isPersistedTokenAvailable(): Promise<AuthResponse> {
        return new Promise<AuthResponse>((resolve, _reject) => {
            this.repository.getAuthToken().then((result) => {
                resolve(new AuthResponse(result, true));
            }, (_error) => {
                resolve(new AuthResponse(undefined, false, ErrorCodes.CHECK_PERSISTED_JWT_FAILED));
            });
        });
    }


    cacheToken(token: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.repository.refreshAuthToken(token).then((result) => {
                resolve(result);
            }, (error) => {
                reject(this.errorMapper.mapEntity(error));
            }).catch((error) => {
                reject(this.errorMapper.mapEntity(error));
            })
        });
    }

    signOut(): Promise<boolean> {
        return this.repository.invalidateSession();
    }

}