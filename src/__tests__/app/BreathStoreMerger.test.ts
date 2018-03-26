import {BreathStoreMerger} from "../../app/globals/BreathStoreMerger";
import {GlobalStore} from "../../app/globals/BreathStore";


const store = GlobalStore.getInstance();
const subject = new BreathStoreMerger(store);

it('merges a store successfully', () => {
    const newStore = {
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

    subject.merge(newStore);
    expect(store.getStore()).toEqual(newStore);

});

it('merges a store successfully when invalid data is sent', () => {
    const newStore = {
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
    const newStoreWithTooMuchData = {...newStore, loggedIn: true, itzTooMuch: true};
    subject.merge(newStoreWithTooMuchData);
    expect(store.getStore()).toEqual({...newStore,});
});
