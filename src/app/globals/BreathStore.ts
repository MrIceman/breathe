import {Session} from "../../data/session/Session";

export interface Store {
    persistedSessions?: Array<Session>,
    loggedIn?: boolean
}

export interface StoreListener {
    onStoreUpdated(store: Store);
}

export class GlobalStore {
    private store: Store;

    constructor(private readonly listeners: Array<StoreListener> = []) {
        this.store = this.getInitialStoreState();
    }

    private getInitialStoreState(): Store {
        return {
            persistedSessions: [],
            loggedIn: false
        }
    }

    public addListener(listener: StoreListener) {
        if (this.listeners.indexOf(listener) === -1)
            this.listeners.push(listener);
    }

    public removeListener(listener: StoreListener) {
        const index = this.listeners.indexOf(listener);
        if (index !== -1)
            this.listeners.splice(index, 1);
    }

    public getListenersProtected(): Array<StoreListener> {
        return [...this.listeners];
    }

    public clearListeners() {
        this.listeners.splice(0, this.listeners.length);
    }

    public refresh(store: Store) {
        this.store = {
            persistedSessions: store.persistedSessions === undefined ? this.store.persistedSessions : store.persistedSessions,
            loggedIn: store.loggedIn === undefined ? this.store.loggedIn : store.loggedIn
        };
        this.notifyListeners();
    }

    public getStore(): Store {
        return this.store;
    }

    private notifyListeners() {
        for (const listener of this.listeners)
            listener.onStoreUpdated(this.store);
    }
}

