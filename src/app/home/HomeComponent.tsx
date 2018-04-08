import {MainWindow} from "../MainWindow";
import * as React from "react";
import {RequireAuthComponent} from "../common/RequireAuthComponent";
import {ManagerFactory} from "../../domain/ManagerFactory";
import {HomeComponentController} from "./HomeComponentController";
import {LocalRepository} from "../../data/repository/LocalRepository";

interface HomeComponentState {
    isProgressing: boolean,
    isLoggedIn: boolean
}

export class HomeComponent extends React.Component<{}, HomeComponentState> {
    protected email: string;
    protected password: string;
    protected username: string;
    protected controller: HomeComponentController;

    constructor(props) {
        super(props);
        this.state = {isProgressing: false, isLoggedIn: false};
        this.controller = new HomeComponentController(this, ManagerFactory.buildAuthManager(), LocalRepository.getInstance());
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    private signUp(email, password, username): void {
        this.controller.signUp(email, password, username);
    }

    private signIn(email, password): void {
        this.controller.signIn(email, password);
    }

    public displayError(message: string) {
        alert(message);
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