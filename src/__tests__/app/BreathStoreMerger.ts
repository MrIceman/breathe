import {BreathStoreMerger} from "../../app/globals/BreathStoreMerger";
import {GlobalStore} from "../../app/globals/BreathStore";


const store = new GlobalStore();
const subject = new BreathStoreMerger(store);

it('merges a store successfully', () => {
    const newStore = {persistedSessions: [], loggedIn: true};
    subject.merge(newStore);
    expect(store.getStore()).toEqual(newStore);

});

it('merges a store successfully when invalid data is sent', () => {
    const newStore = {persistedSessions: [], loggedIn: true};
    const newStoreWithTooMuchData = {persistedSessions: [], loggedIn: true, itzTooMuch: true};
    subject.merge(newStoreWithTooMuchData);
    expect(store.getStore()).toEqual(newStore);
});

it('missing state arguments dont cause an undefined variable', () => {
    const newStore = {loggedIn: true,  just2much4diz: 'yo'};
    subject.merge(newStore);
    expect(store.getStore()).toEqual({persistedSessions: [], loggedIn: true});
});