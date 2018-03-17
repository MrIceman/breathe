import { Dispatcher } from "../common/Dispatcher";
import { ActionType } from "../common/ActionType";
import { AuthResponse } from "../../domain/auth/model/AuthResponse";
import { AuthRequest } from "../../domain/auth/model/AuthRequest";
import { ErrorCodes } from "../../model/ErrorCodes";
import { UseCaseFactory } from "../../domain/UseCaseFactory";
export class AuthAction {
    constructor(dispatcher, authManager) {
        this.dispatcher = dispatcher;
        this.authManager = authManager;
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new AuthAction(Dispatcher.getInstance(), UseCaseFactory.buildAuthUseCase());
        }
        return this.instance;
    }
    trySignIn(email, password) {
        this.authManager.signIn(new AuthRequest(email, password)).then((result) => {
            if (result.successful) {
                this.persistToken(result.jwtToken);
            }
            else
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
            if (result)
                this.dispatcher.dispatch(ActionType.CHECK_TOKEN_PERSISTED_SUCCESS, new AuthResponse(token, true));
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