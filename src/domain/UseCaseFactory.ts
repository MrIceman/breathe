import {AuthGatewayImpl} from "../data/auth/AuthGatewayImpl";
import {AuthManager} from "./auth/AuthManager";
import {AuthManagerImpl} from "./auth/impl/AuthManagerImpl";
import {LocalRepository} from "../data/repository/LocalRepository";
import {AuthResponseMapper} from "./common/AuthResponseMapper";
import {ErrorResponseMapper} from "./common/ErrorResponseMapper";

export class UseCaseFactory {

    public static buildAuthUseCase(): AuthManager {
        return new AuthManagerImpl(new AuthGatewayImpl(), LocalRepository.getInstance(), new AuthResponseMapper(), new ErrorResponseMapper());
    }
}