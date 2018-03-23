import {GlobalStore, Store} from "../../app/globals/BreathStore";
import {Session} from "../../data/session/Session";

export class StoreMock implements Store {
    persistedSessions: Array<Session>;
    loggedIn: boolean;
}

const storeMock = new StoreMock();
const subject = new GlobalStore(storeMock);

it('has a valid initial state', () => {
    expect(subject.getStore()).toEqual(
        {
            persistedSessions: [],
            loggedIn: false
        }
    )
});