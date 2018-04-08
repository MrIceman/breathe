import {MainWindow} from "../MainWindow";
import * as React from "react";
import {RequireAuthComponent} from "../common/RequireAuthComponent";
import {ManagerFactory} from "../../domain/ManagerFactory";
import {HomeComponentController} from "./HomeComponentController";
import {LocalRepository} from "../../data/repository/LocalRepository";
import {ProgressViewIOS, Text} from "react-native";

interface HomeComponentState {
    isProgressing: boolean,
    isLoggedIn: boolean,
    currentProgress: number,
    currentUsername: string
}

export class HomeComponent extends React.Component<{}, HomeComponentState> {
    protected email: string;
    protected password: string;
    protected username: string;
    protected controller: HomeComponentController;

    constructor(props) {
        super(props);
        this.state = {isProgressing: false, isLoggedIn: false, currentProgress: 0, currentUsername: ''};
        this.controller = new HomeComponentController(this, ManagerFactory.buildAuthManager(), LocalRepository.getInstance());
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    componentWillMount(): void {
        this.controller.tryAuth();
    }

    private signUp(email, password, username): void {
        this.controller.signUp(email, password, username);
    }

    private signIn(email, password): void {
        this.controller.signIn(email, password);
    }

    public displayMessage(message: string) {
        alert(message);
    }

    private getProgressBar() {
        return <ProgressViewIOS progress={this.state.currentProgress}/>
    }

    private getDashboard() {
        return <Text>You are successfully logged in, {this.state.currentUsername}</Text>
    }

    public updateState(state: HomeComponentState) {
        this.setState(state);
    }


    render() {
        return (
            <MainWindow>
                {!this.state.isLoggedIn && !this.state.isProgressing &&
                <RequireAuthComponent signUp={this.signUp} signIn={this.signIn}
                                      isProgressing={this.state.isProgressing}/>}

                {this.state.isProgressing && this.getProgressBar()}
                {this.state.isLoggedIn && !this.state.isProgressing && this.getDashboard()}
            </MainWindow>
        );
    }
}