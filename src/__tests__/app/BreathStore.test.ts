import {GlobalStore, Store, StoreListener} from "../../app/globals/BreathStore";
import {deepEqual, instance, mock, verify} from "ts-mockito";

class StoreUpdateListener implements StoreListener {
    onStoreUpdated(store: Store) {
        store.login;
    }
}

const subject = GlobalStore.getInstance();
const listener = mock(StoreUpdateListener);


beforeEach(() => {
    subject.clearListeners();
});

it('has a valid initial state', () => {
    expect(subject.getStore()).toEqual(
        {
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
    )
});

it('registers a listener successfully', () => {
    subject.addListener(listener);
    expect(subject.getListenersProtected().indexOf(listener)).not.toEqual(-1);
});

it('can not register a listener twice', () => {
    subject.addListener(listener);
    subject.addListener(listener);
    let counter = 0;
    for (const listener of subject.getListenersProtected()) {
        if (listener === listener)
            counter++;
    }
    expect(counter).toEqual(1);
});

it('unregisters a listener successfully', () => {
    subject.addListener(listener);
    subject.removeListener(listener);
    expect(subject.getListenersProtected().indexOf(listener)).toEqual(-1);
});

it('updates component when state refreshes', async () => {
    const store = {
        session: {persistedSessions: []},
        login: {
            userEmail: '',
            userPassword: '',
            isLoggedIn: false,
            logInFailed: false,
            message: '',
            token: ''
        }
    };
    subject.addListener(instance(listener));
    await subject.refresh(store);
    verify(listener.onStoreUpdated(deepEqual(store))).once();
});

it('updates not component when state refreshes and it unregisters', async () => {
    const store = {
        session: {persistedSessions: []},
        login: {
            userEmail: '',
            userPassword: '',
            isLoggedIn: false,
            logInFailed: false,
            message: '',
            token: ''
        }
    };
    const listener_2 = mock(StoreUpdateListener);
    const listener_2_instance = instance(listener_2);
    subject.addListener(listener_2_instance);
    await subject.refresh(store);
    verify(listener_2.onStoreUpdated(deepEqual(store))).once();
    await subject.removeListener(listener_2_instance);
    await subject.refresh(store);
    verify(listener_2.onStoreUpdated(deepEqual(store))).once();
});