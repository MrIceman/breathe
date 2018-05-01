import {BreathingController} from "../../../app/session/BreathingController";
import {BreathingComponent} from "../../../app/session/BreathingComponent";
import {anything, instance, mock, resetCalls, verify, when} from "ts-mockito";
import {SessionManagerImpl} from "../../../domain/session/impl/SessionManagerImpl";
import {Session} from "../../../data/session/Session";
import any = jasmine.any;

const component = mock(BreathingComponent);
const sessionManager = mock(SessionManagerImpl);
const subject = new BreathingController(instance(component), instance(sessionManager));


beforeEach(() => {
    try {
        subject.retentionMap.clear();
        subject.amountOfRounds = 0;
        subject.amountOfBreaths.clear();
    } catch (e) {
        // ignore
    }
});


it('it creates and saves a session', async () => {
    const sessionMock = mock(Session);
    const amountOfRounds: number = 1;
    const custom: boolean = false;
    const retentionTime: Map<number, number> = new Map();
    const amountOfBreathsPerRetention: Map<number, number> = new Map();
    const notes = '';
    when(sessionManager.createAndSaveSession(amountOfRounds, custom, retentionTime, amountOfBreathsPerRetention, notes))
        .thenResolve(instance(sessionMock));

    await subject.onSaveSession(amountOfRounds, custom, retentionTime, amountOfBreathsPerRetention, notes);

    verify(component.updateState(anything())).once();
});

it('it fails to create and save a session', async () => {
    resetCalls(component);
    const sessionMock = mock(Session);
    const amountOfRounds: number = 1;
    const custom: boolean = false;
    const retentionTime: Map<number, number> = new Map();
    const amountOfBreathsPerRetention: Map<number, number> = new Map();
    const notes = '';
    when(sessionManager.createAndSaveSession(amountOfRounds, custom, retentionTime, amountOfBreathsPerRetention, notes))
        .thenReject(instance(sessionMock));

    await subject.onSaveSession(amountOfRounds, custom, retentionTime, amountOfBreathsPerRetention, notes);

    verify(component.updateState(anything())).once();
});

it('starts a session', () => {
    subject.startSession();
    expect(subject.amountOfBreaths).toEqual(new Map());
    expect(subject.amountOfRounds).toEqual(0);
    expect(subject.retentionMap).toEqual(new Map());
    expect(subject.notes).toEqual('');
});

it('updates a retention round without tracking breaths', () => {
    subject.addRound(20);
    expect(subject.retentionMap).toEqual(new Map().set(1, 20));
    expect(subject.amountOfRounds).toEqual(1);
    expect(subject.amountOfBreaths).toEqual(new Map())
});

it('updates 2 retention rounds', () => {
    subject.addRound(20);
    subject.addRound(40);
    expect(subject.retentionMap).toEqual(new Map().set(1, 20).set(2, 40));
    expect(subject.amountOfRounds).toEqual(2);
});

it('updates a round with retention time and amount of breaths', () => {
    subject.addRound(20, 40);
    expect(subject.retentionMap).toEqual(new Map().set(1, 20));
    expect(subject.amountOfBreaths).toEqual(new Map().set(1, 40));
});