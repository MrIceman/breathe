import {AbstractStore} from "../common/AbstractStore";
import {AuthResponse} from "../../domain/auth/model/AuthResponse";
import {ActionType} from "../common/ActionType";
import * as React from "react";

import {AbstractStateModel} from "../common/AbstractStateModel";

export interface LoginStateModel extends AbstractStateModel {
    userEmail: string;
    userPassword: string;
    isAuthInProgress: boolean;
    isLoggedIn: boolean;
    logInFailed: boolean;
    message: string;
}

export class LoginStore extends AbstractStore<LoginStateModel, AuthResponse> {
    state: LoginStateModel;

    constructor(component: React.Component) {
        super(component);
        this.state = this.getInitialState();
    }

    receive(actionType: ActionType, _response: AuthResponse) {
        switch (actionType) {
            case ActionType.ON_LOG_IN_SUCCESS:
                this.state = {
                    ...this.getInitialState(),
                    isAuthInProgress: false,
                    isLoggedIn: true,
                    message: 'Login Successful'
                };
                break;
            case ActionType.ON_LOG_IN:
                this.state = {
                    ...this.getInitialState(),
                    isAuthInProgress: true,
                    message: 'Please wait while sign in is processing'
                };
                break;
            case ActionType.ON_LOG_IN_FAIL:
                this.state = {
                    ...this.getInitialState(),
                    isAuthInProgress: false,
                    logInFailed: true,
                    isLoggedIn: false,
                    message: 'Login Failed'
                };
        }

        this.updateState();
    }

    getInitialState(): LoginStateModel {
        return {
            userEmail: '',
            userPassword: '',
            isAuthInProgress: false,
            isLoggedIn: false,
            logInFailed: false,
            message: ''
        };
    }
}
