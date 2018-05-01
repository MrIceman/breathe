import {AuthGatewayImpl} from "../data/auth/AuthGatewayImpl";
import {AuthManager} from "./auth/AuthManager";
import {AuthManagerImpl} from "./auth/impl/AuthManagerImpl";
import {LocalRepository} from "../data/repository/LocalRepository";
import {AuthResponseMapper} from "./common/AuthResponseMapper";
import {ErrorResponseMapper} from "./common/ErrorResponseMapper";
import {AuthRequestMapper} from "./common/AuthRequestMapper";
import {SessionManager} from "./session/SessionManager";
import {SessionManagerImpl} from "./session/impl/SessionManagerImpl";
import {NetworkChecker} from "../utils/NetworkChecker";
import {SessionFactory} from "../data/session/SessionFactory";
import {SessionGatewayImpl} from "../data/session/SessionGatewayImpl";

export class ManagerFactory {
    private static authManager: AuthManager;
    private static sessionManager: SessionManager;

    public static buildAuthManager(): AuthManager {
        if(this.authManager === null)
        this.authManager = new AuthManagerImpl(new AuthGatewayImpl(), LocalRepository.getInstance(), new AuthResponseMapper(), new AuthRequestMapper(),
            new ErrorResponseMapper());
        return this.authManager;
    }

    public static buildSessionManger(): SessionManager {
        if(this.sessionManager === null)
            this.sessionManager = new SessionManagerImpl(new SessionGatewayImpl(), LocalRepository.getInstance(), new NetworkChecker(),
            new SessionFactory(), this.buildAuthManager());

        return this.sessionManager;
    }
}