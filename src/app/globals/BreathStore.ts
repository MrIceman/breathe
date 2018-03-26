import {Session} from "../../data/session/Session";

export interface Store {
    session: { persistedSessions?: Array<Session> },
    login: {
        userEmail: string;
        userPassword: string;
        isLoggedIn: boolean;
        logInFailed: boolean;
        message: string;
        token: string;
    }
}

export interface StoreListener {
    onStoreUpdated(store: Store);
}

export class GlobalStore {
    private store: Store;
    private static instance: GlobalStore;

    private constructor(private readonly listeners: Array<StoreListener> = []) {
        this.store = this.getInitialStoreState();
    }

    public static getInstance(): GlobalStore {
        if (this.instance == null)
            this.instance = new GlobalStore();
        return this.instance;
    }

    private getInitialStoreState(): Store {
        return {
            session: {persistedSessions: []},
            login: {
                userEmail: '',
                userPassword: '',
                isLoggedIn: false,
                logInFailed: false,
                message: '',
                token: ''
            }
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
            session: store.session === undefined ? this.store.session : store.session,
            login: store.login === undefined ? this.store.login : store.login
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

