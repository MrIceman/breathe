import {AuthGatewayImpl} from "../data/auth/AuthGatewayImpl";
import {AuthManager} from "./auth/AuthManager";
import {AuthManagerImpl} from "./auth/impl/AuthManagerImpl";
import {LocalStorage} from "../data/repository/LocalStorage";
import {AuthResponseMapper} from "./common/AuthResponseMapper";
import {ErrorResponseMapper} from "./common/ErrorResponseMapper";

export class UseCaseFactory {

    public static buildAuthUseCase(): AuthManager {
        return new AuthManagerImpl(new AuthGatewayImpl(), LocalStorage.getInstance(), new AuthResponseMapper(), new ErrorResponseMapper());
    }
}