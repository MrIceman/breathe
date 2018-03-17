import * as React from "react";
import {AbstractStateModel} from "./AbstractStateModel";
import {Dispatcher, Receiver} from "./Dispatcher";
import {Response} from "../../model/response/Response";
import {ActionType} from "./ActionType";

export abstract class AbstractStore<S extends AbstractStateModel, T extends Response> implements Receiver<T> {
    protected state: S;

    abstract receive(actionType: ActionType, response: T);

    protected component: React.Component;

    constructor(component: React.Component) {
        this.component = component;
        this.registerToDispatcher();
    }

    registerToDispatcher() {
        Dispatcher.getInstance().registerReceiver(this);
    };

    unregisterFromDispatcher() {
        Dispatcher.getInstance().unregisterReceiver(this);
    };

    updateState(): void {
        this.component.setState(this.state);
    }


    abstract getInitialState(): S;
}