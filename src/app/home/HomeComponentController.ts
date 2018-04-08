import {HomeComponent} from "./HomeComponent";
import {AuthManager} from "../../domain/auth/AuthManager";
import {ErrorEntity} from "../../model/entity/ErrorEntity";
import {AuthResponse} from "../../domain/auth/model/AuthResponse";
import {LocalRepository} from "../../data/repository/LocalRepository";

export class HomeComponentController {

    constructor(private readonly component: HomeComponent, private readonly authManager: AuthManager, private readonly repository: LocalRepository) {
    }

    public signIn(id: string, password: string) {
        this.authManager.signIn(id, password).then((_result) => {
            // cache token
        }, (error: ErrorEntity) => {
            this.component.displayError((error.code * 123) + ':' + error.message);
        });

    }

    public async signUp(id: string, password: string, username: string)  {
        this.authManager.createAccount(id, password, username).then((result: AuthResponse) => {
            this.repository.refreshAuthToken(result.jwtToken).then((_result) => {
                // this.component.setState({isLoggedIn: true, isProgressing: false});
                this.component.displayError('');
            });
        }, (error: ErrorEntity) => {
            alert(error.message);
        });
    }
}