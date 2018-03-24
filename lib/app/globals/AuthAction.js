import { Dispatcher } from "../common/Dispatcher";
import { ActionType } from "../common/ActionType";
import { AuthResponse } from "../../domain/auth/model/AuthResponse";
import { AuthRequest } from "../../domain/auth/model/AuthRequest";
import { ErrorCodes } from "../../model/ErrorCodes";
import { ManagerFactory } from "../../domain/ManagerFactory";
export class AuthAction {
    constructor(dispatcher, authManager) {
        this.dispatcher = dispatcher;
        this.authManager = authManager;
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new AuthAction(Dispatcher.getInstance(), ManagerFactory.buildAuthManager());
        }
        return this.instance;
    }
    signIn(email, password) {
        this.dispatcher.dispatch(ActionType.ON_LOG_IN);
        this.authManager.signIn(email, password).then((result) => {
            if (result.successful)
                this.dispatcher.dispatch(ActionType.ON_LOG_IN_SUCCESS, result);
            else
                this.loginFailed();
        }, (_) => {
            this.loginFailed();
        }).catch((_error) => {
            this.loginFailed();
        });
    }
    register(email, password, displayName) {
        this.authManager.createAccount(new AuthRequest(email, password, displayName)).then((result) => {
            if (result.successful) {
                this.dispatcher.dispatch(ActionType.ON_REGISTER_SUCCESS, result);
            }
            else
                this.loginFailed();
        }, (_) => {
            this.loginFailed();
        });
    }
    isTokenPersisted() {
        this.dispatcher.dispatch(ActionType.ON_TOKEN_PERSIST);
        this.authManager.isPersistedTokenAvailable().then((result) => {
            if (result.successful)
                this.dispatcher.dispatch(ActionType.ON_TOKEN_PERSIST_SUCCESS, result);
            else
                this.loginFailed();
        });
    }
    persistToken(token) {
        this.authManager.cacheToken(token).then((result) => {
            if (result !== null)
                this.dispatcher.dispatch(ActionType.CHECK_TOKEN_PERSISTED_SUCCESS, new AuthResponse(result, true));
            else
                this.dispatcher.dispatch(ActionType.CHECK_TOKEN_PERSISTED_FAIL, new AuthResponse(undefined, false, ErrorCodes.SIGN_IN_FAILED));
        }).catch((_error) => {
            this.loginFailed();
        });
    }
    loginFailed() {
        this.dispatcher.dispatch(ActionType.ON_LOG_IN_FAIL);
    }
}
//# sourceMappingURL=AuthAction.js.map