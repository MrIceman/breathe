import {MainWindow} from "../MainWindow";
import * as React from "react";
import {RequireAuthComponent} from "../common/RequireAuthComponent";
import {AuthManager} from "../../domain/auth/AuthManager";
import {ManagerFactory} from "../../domain/ManagerFactory";
import {ErrorEntity} from "../../model/entity/ErrorEntity";

interface HomeComponentState {
    isProgressing: boolean,
    isLoggedIn: boolean
}

export class HomeComponent extends React.Component<{}, HomeComponentState> {
    protected email: string;
    protected password: string;
    protected username: string;
    protected authManager: AuthManager;

    constructor(props) {
        super(props);
        this.state = {isProgressing: false, isLoggedIn: false};
        this.authManager = ManagerFactory.buildAuthManager();
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    private signUp(email, password, username): void {
        this.authManager.createAccount(email, password, username).then((_) => {
            alert('Success!');
            },
            (reject: ErrorEntity) => {
                alert((reject.code * 123) + ' : ' + reject.message)
            });

    }

    private signIn(email, password): void {
        this.authManager.signIn(email, password);
    }


    render() {
        return (
            <MainWindow>
                <RequireAuthComponent signUp={this.signUp} signIn={this.signIn}
                                      isProgressing={this.state.isProgressing}/>
            </MainWindow>
        );
    }
}