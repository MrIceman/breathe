import {AbstractStateModel} from "../common/AbstractStateModel";
import {AbstractStore} from "../common/AbstractStore";
import {ActionType} from "../common/ActionType";
import {AuthResponse} from "../../domain/auth/model/AuthResponse";
import * as React from "react";

export interface AuthStoreState extends AbstractStateModel {
    isTokenPersisted: boolean;
    authenticationFailed: boolean;
    isAuthenticated: boolean;
    checkedIfTokenIsPersisted: boolean;
}

export class AuthStore extends AbstractStore<AuthStoreState, AuthResponse> {

    /** This Store is ment to be used only by the entry point App.tsx */

    private static instance: AuthStore;

    private constructor(component: React.Component) {
        super(component);
        this.state = this.getInitialState();
    };

    public static getInstance(component: React.Component) {
        if (this.instance == null) {
            this.instance = new AuthStore(component);
        } else if (this.instance.component !== component)
            this.instance.component = component;
        return this.instance;
    }

    receive(actionType: ActionType, response: AuthResponse): void {
        this.state = this.getInitialState();

        switch (actionType) {
            case (ActionType.CHECK_TOKEN_PERSISTED_SUCCESS):
                console.warn('Received response: ' + response);
                this.state.isTokenPersisted = true;
                this.state.isAuthenticated = true;
                this.state.checkedIfTokenIsPersisted = true;
                this.updateState();
                break;
            case (ActionType.CHECK_TOKEN_PERSISTED_FAIL):
                this.state.checkedIfTokenIsPersisted = true;
                this.updateState();
                break;
        }
    }

    getInitialState(): AuthStoreState {
        return {
            isTokenPersisted: false,
            authenticationFailed: false,
            isAuthenticated: false,
            checkedIfTokenIsPersisted: false
        };
    }
}