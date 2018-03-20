import { AuthGatewayImpl } from "../data/auth/AuthGatewayImpl";
import { AuthManagerImpl } from "./auth/impl/AuthManagerImpl";
import { LocalRepository } from "../data/repository/LocalRepository";
import { AuthResponseMapper } from "./common/AuthResponseMapper";
import { ErrorResponseMapper } from "./common/ErrorResponseMapper";
export class UseCaseFactory {
    static buildAuthUseCase() {
        return new AuthManagerImpl(new AuthGatewayImpl(), LocalRepository.getInstance(), new AuthResponseMapper(), new ErrorResponseMapper());
    }
}
//# sourceMappingURL=UseCaseFactory.js.map