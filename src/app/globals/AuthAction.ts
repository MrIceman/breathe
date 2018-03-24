import {Action} from "../common/AbstractAction";
import {Dispatcher} from "../common/Dispatcher";
import {ActionType} from "../common/ActionType";
import {AuthResponse} from "../../domain/auth/model/AuthResponse";
import {AuthRequest} from "../../domain/auth/model/AuthRequest";
import {AuthManager} from "../../domain/auth/AuthManager";
import {ErrorCodes} from "../../model/ErrorCodes";
import {ManagerFactory} from "../../domain/ManagerFactory";

export class AuthAction implements Action {
    private static instance: AuthAction;

    constructor(private dispatcher: Dispatcher, private authManager: AuthManager) {
    }

    public static getInstance(): AuthAction {
        if (this.instance == null) {
            this.instance = new AuthAction(Dispatcher.getInstance(), ManagerFactory.buildAuthManager());
        }
        return this.instance;
    }

    signIn(email: string, password: string): void {
        this.dispatcher.dispatch(ActionType.ON_LOG_IN);
        this.authManager.signIn(email, password).then((result: AuthResponse) => {
            if (result.successful)
                this.dispatcher.dispatch(ActionType.ON_LOG_IN_SUCCESS, result);
            else
                this.loginFailed();
        }, (_) => {
            this.loginFailed();
        }).catch((_error) => {
            this.loginFailed()
        })
    }

    register(email: string, password: string, displayName: string): void {
        this.authManager.createAccount(new AuthRequest(email, password, displayName)).then((result: AuthResponse) => {
            if (result.successful) {
                this.dispatcher.dispatch(ActionType.ON_REGISTER_SUCCESS, result);
            }
            else
                this.loginFailed()
        }, (_) => {
            this.loginFailed();
        });
    }

    isTokenPersisted(): void {
        this.dispatcher.dispatch(ActionType.ON_TOKEN_PERSIST);
        this.authManager.isPersistedTokenAvailable().then((result: AuthResponse) => {
            if (result.successful)
                this.dispatcher.dispatch(ActionType.ON_TOKEN_PERSIST_SUCCESS, result);
            else
                this.loginFailed()
        });
    }

    persistToken(token: string) {
        this.authManager.cacheToken(token).then((result: string) => {
            if (result !== null)
                this.dispatcher.dispatch(ActionType.CHECK_TOKEN_PERSISTED_SUCCESS, new AuthResponse(result, true));
            else
                this.dispatcher.dispatch(ActionType.CHECK_TOKEN_PERSISTED_FAIL, new AuthResponse(undefined, false, ErrorCodes.SIGN_IN_FAILED));
        }).catch((_error) => {
            this.loginFailed();
        });
    }

    private loginFailed() {
        this.dispatcher.dispatch(ActionType.ON_LOG_IN_FAIL);
    }
}