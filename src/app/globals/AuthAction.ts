import {Action} from "../common/AbstractAction";
import {Dispatcher} from "../common/Dispatcher";
import {ActionType} from "../common/ActionType";
import {AuthResponse} from "../../domain/auth/model/AuthResponse";
import {AuthRequest} from "../../domain/auth/model/AuthRequest";
import {AuthManager} from "../../domain/auth/AuthManager";
import {ErrorCodes} from "../../model/ErrorCodes";
import {UseCaseFactory} from "../../domain/UseCaseFactory";

export class AuthAction implements Action {
    private static instance: AuthAction;

    constructor(private dispatcher: Dispatcher, private authManager: AuthManager) {
    }

    public static getInstance(): AuthAction {
        if (this.instance == null) {
            this.instance = new AuthAction(Dispatcher.getInstance(), UseCaseFactory.buildAuthUseCase());
        }
        return this.instance;
    }

    trySignIn(email: string, password: string): void {
        this.authManager.signIn(new AuthRequest(email, password)).then((result: AuthResponse) => {
            if (result.successful) {
                this.persistToken(result.jwtToken);
            }
            else
                this.loginFailed()

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
        this.authManager.cacheToken(token).then((result: boolean) => {
            if (result)
                this.dispatcher.dispatch(ActionType.CHECK_TOKEN_PERSISTED_SUCCESS, new AuthResponse(token, true));
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