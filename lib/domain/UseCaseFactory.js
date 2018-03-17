import { AuthGatewayImpl } from "../data/auth/AuthGatewayImpl";
import { AuthManagerImpl } from "./auth/impl/AuthManagerImpl";
import { LocalStorage } from "../data/repository/LocalStorage";
import { AuthResponseMapper } from "./common/AuthResponseMapper";
import { ErrorResponseMapper } from "./common/ErrorResponseMapper";
export class UseCaseFactory {
    static buildAuthUseCase() {
        return new AuthManagerImpl(new AuthGatewayImpl(), LocalStorage.getInstance(), new AuthResponseMapper(), new ErrorResponseMapper());
    }
}
//# sourceMappingURL=UseCaseFactory.js.map