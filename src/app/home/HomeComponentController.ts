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
            this.component.updateState({
                isLoggedIn: true,
                isProgressing: false,
                currentProgress: 0,
                currentUsername: ''
            });
        }, (error: ErrorEntity) => {
            this.component.displayMessage((error.code * 123) + ':' + error.message);
        });

    }

    public async signUp(id: string, password: string, username: string) {
        this.component.setState({isLoggedIn: false, isProgressing: true, currentProgress: 0.3});
        this.authManager.createAccount(id, password, username).then(async (result: AuthResponse) => {
            this.component.setState({isLoggedIn: false, isProgressing: true, currentProgress: 0.6});
            this.repository.refreshAuthToken(result.jwtToken).then(async (_result) => {
                // this.component.setState({isLoggedIn: true, isProgressing: false});
                await this.repository.cacheUsername(username);
                this.component.displayMessage('Congratulations! Your sign up was successful.');
                this.component.updateState({
                    isLoggedIn: true,
                    isProgressing: false,
                    currentProgress: 0,
                    currentUsername: username
                });
            });
        }, (error: ErrorEntity) => {
            alert(error.message);
        });
    }

    public tryAuth(): Promise<boolean> {
        /**
         * Gets called on App Start to figure out if the user
         * was logged in already before
         */
        return new Promise<boolean>((resolve, _reject) => {
            this.component.updateState({
                isLoggedIn: false,
                isProgressing: true,
                currentProgress: 0.1,
                currentUsername: ''
            });
            this.repository.isAuthTokenPersisted().then((result) => {
                if (result) {
                    this.repository.getUsername().then((username) => {
                        this.component.updateState({
                            isLoggedIn: result,
                            isProgressing: false,
                            currentProgress: 0,
                            currentUsername: username
                        });
                    });
                    resolve(true);
                } else {
                    this.component.updateState({
                        isLoggedIn: false,
                        isProgressing: false,
                        currentProgress: 0,
                        currentUsername: ''
                    });
                    resolve(false);
                }


            }, (_error) => {
                this.component.updateState({
                    isLoggedIn: false,
                    isProgressing: false,
                    currentProgress: 0,
                    currentUsername: ''
                });
            }).catch((_error) => {
                this.component.updateState({
                    isLoggedIn: false,
                    isProgressing: false,
                    currentProgress: 0,
                    currentUsername: ''
                });
                resolve(false);
            })
        });
    }

}