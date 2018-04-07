import {MainWindow} from "../MainWindow";
import * as React from "react";
import {RequireAuthComponent} from "../common/RequireAuthComponent";
import {AuthManager} from "../../domain/auth/AuthManager";
import {AuthManagerImpl} from "../../domain/auth/impl/AuthManagerImpl";
import {AuthGatewayImpl} from "../../data/auth/AuthGatewayImpl";
import {LocalRepository} from "../../data/repository/LocalRepository";
import {AuthResponseMapper} from "../../domain/common/AuthResponseMapper";
import {AuthRequestMapper} from "../../domain/common/AuthRequestMapper";
import {ErrorResponseMapper} from "../../domain/common/ErrorResponseMapper";

interface HomeComponentProps {
    isLoggedIn: boolean,
    signIn: void,
    signUp: void,
    isProgressing: boolean
}

export class HomeComponent extends React.Component<HomeComponentProps> {
    protected email: string;
    protected password: string;
    protected username: string;
    protected authManager: AuthManager;

    constructor(props) {
        super(props);
        this.authManager = new AuthManagerImpl(new AuthGatewayImpl(), LocalRepository.getInstance(), new AuthResponseMapper(),
            new AuthRequestMapper(), new ErrorResponseMapper());
    }

    private signUp(email, password, username): void {
        this.authManager.createAccount(email, password, username);
    }

    private signIn(email, password): void {
        this.authManager.signIn(email, password);
    }


    render() {
        return (
            <MainWindow>
                <RequireAuthComponent signUp={this.signUp} signIn={this.signIn}/>
            </MainWindow>
        );
    }
}