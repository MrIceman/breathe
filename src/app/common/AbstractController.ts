import * as React from "react";
import {GlobalStore, Store, StoreListener} from "../globals/BreathStore";

export interface ViewStoreState {
}

export abstract class AbstractController<S extends ViewStoreState> implements StoreListener {
    protected state: S;

    constructor(protected readonly component: React.Component, protected readonly globalStore: GlobalStore) {
        this.registerToStore();
    }

    protected registerToStore() {
        this.globalStore.addListener(this);
    };

    protected unregisterFromStore() {
        this.globalStore.removeListener(this);
    };

    protected updateView() {
        this.component.setState(this.state);
    }

    abstract getInitialState(): S;

    onStoreUpdated(store: Store) {
        const filteredStore = this.mergeStoreToViewStore(store);
        this.component.setState(filteredStore);
    };

    abstract mergeStoreToViewStore(storeData: Store): S;

    onUnmountView() {
        this.unregisterFromStore();
    }

    abstract updateState(values: {});
}