import {AbstractStore} from "../common/AbstractStore";
import {AuthResponse} from "../../domain/auth/model/AuthResponse";
import {ActionType} from "../common/ActionType";
import * as React from "react";

import {AbstractStateModel} from "../common/AbstractStateModel";

export interface RegisterStateModel extends AbstractStateModel {
    validEmail: boolean,
    validPassword: boolean,
    validDisplayName: boolean,
    emailInput: string,
    passwordInput: string,
    displayName: string,
    inProgress: boolean,
    registerFailed: boolean,
    registerComplete: boolean
}

export class RegisterStore extends AbstractStore<RegisterStateModel, AuthResponse> {
    state: RegisterStateModel;

    constructor(component: React.Component) {
        super(component);
        this.state = this.getInitialState();
        this.component.setState(this.state);
    }


    receive(actionType: ActionType, _response: AuthResponse) {
        switch (actionType) {
            case ActionType.ON_REGISTER:
                this.state = {
                    ...this.state,
                    inProgress: true
                };
                break;
            case ActionType.ON_REGISTER_SUCCESS:
                this.state = {
                    ...this.state,
                    inProgress: false,
                    registerComplete: true,
                    registerFailed: false
                };
                break;
            case ActionType.ON_REGISTER_FAILED:
                this.state = {
                    ...this.state,
                    inProgress: false,
                    registerComplete: true,
                    registerFailed: true
                };
                break;
        }

        this.updateState();
    }

    getInitialState(): RegisterStateModel {
        return {
            validEmail: false,
            validPassword: false,
            validDisplayName: false,
            emailInput: '',
            passwordInput: '',
            displayName: '',
            inProgress: false,
            registerFailed: false,
            registerComplete: false
        };
    }

}