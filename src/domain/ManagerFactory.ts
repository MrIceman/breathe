import {AuthGatewayImpl} from "../data/auth/AuthGatewayImpl";
import {AuthManager} from "./auth/AuthManager";
import {AuthManagerImpl} from "./auth/impl/AuthManagerImpl";
import {LocalRepository} from "../data/repository/LocalRepository";
import {AuthResponseMapper} from "./common/AuthResponseMapper";
import {ErrorResponseMapper} from "./common/ErrorResponseMapper";
import {AuthRequestMapper} from "./common/AuthRequestMapper";

export class ManagerFactory {

    public static buildAuthManager(): AuthManager {
        return new AuthManagerImpl(new AuthGatewayImpl(), LocalRepository.getInstance(), new AuthResponseMapper(), new AuthRequestMapper(),
            new ErrorResponseMapper());
    }
}