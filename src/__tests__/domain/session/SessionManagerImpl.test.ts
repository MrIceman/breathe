import {SessionManagerImpl} from "../../../domain/session/impl/SessionManagerImpl";
import {instance, mock, verify, when} from "ts-mockito";
import {SessionGateway} from "../../../domain/session/SessionGateway";
import {Session} from "../../../data/session/Session";
import {LocalRepository} from "../../../data/repository/LocalRepository";
import {NetworkChecker} from "../../../utils/NetworkChecker";
import {SessionFactory} from "../../../data/session/SessionFactory";
import {AuthManagerImpl} from "../../../domain/auth/impl/AuthManagerImpl";
import {AuthResponse} from "../../../domain/auth/model/AuthResponse";
import {ErrorEntity} from "../../../model/entity/ErrorEntity";


class GatewayMock implements SessionGateway {
    getSessionById() {
    }

    createSession(_amountOfRounds: number, _custom: boolean, _retentionTimeMap: Map<number, number>, _amountOfBreathsPerRetention: Map<number, number>, _notes: string): Promise<Session> {
        return undefined;
    }

    updateSession(_session: Session): Session {
        return undefined;
    }

}

const gateway = mock(GatewayMock);
const repository = mock(LocalRepository);
const networkChecker = mock(NetworkChecker);
const sessionFactory = mock(SessionFactory);
const authManager = mock(AuthManagerImpl);
const subject = new SessionManagerImpl(instance(gateway), instance(repository), instance(networkChecker), instance(sessionFactory), instance(authManager));

it('stores a session only in cache and does no gateway call when no internet available on phone', async (done) => {
    let amountOfRounds = 0;
    let custom = false;
    let map = new Map();
    let map2 = new Map();
    let notes = '';
    const sessionMock = instance(mock(Session));
    when(sessionFactory.createNewSession(amountOfRounds, custom, map, map2, notes)).thenReturn(sessionMock);
    when(networkChecker.isDeviceConnected()).thenResolve(false);
    when(repository.insertSession(sessionMock)).thenResolve(sessionMock);
    when(authManager.isAuthenticated()).thenResolve(new AuthResponse('', true));
    subject.createSession(amountOfRounds, custom, map, map2, notes).then((result) => {
        verify(gateway.createSession(amountOfRounds, custom, map, map2, notes)).never();
        verify(repository.insertSession(sessionMock)).once();
        expect(result).toEqual(sessionMock);
        done();
    });
});

it('stores a session only in cache and does no gateway call when internet is available on phone but user is not signed in', async (done) => {
    let amountOfRounds = 0;
    let custom = false;
    let map = new Map();
    let map2 = new Map();
    let notes = '';
    const sessionMock = instance(mock(Session));
    when(sessionFactory.createNewSession(amountOfRounds, custom, map, map2, notes)).thenReturn(sessionMock);
    when(networkChecker.isDeviceConnected()).thenResolve(true);
    when(repository.insertSession(sessionMock)).thenResolve(sessionMock);
    when(authManager.isAuthenticated()).thenReject(new ErrorEntity(-1));
    subject.createSession(amountOfRounds, custom, map, map2, notes).then((result) => {
        verify(gateway.createSession(amountOfRounds, custom, map, map2, notes)).never();
        verify(repository.insertSession(sessionMock)).once();
        expect(result).toEqual(sessionMock);
        done();
    });
});

it('stores a session in gateway because user is authenticated and netowrk is available and then updates it in cache', async (done) => {

    let amountOfRounds = 0;
    let custom = false;
    let map = new Map();
    let map2 = new Map();
    let notes = '';
    const sessionMock = new Session(undefined, undefined, undefined, amountOfRounds, custom, map, map2, notes);
    const syncedSessionMock = instance(mock(Session));
    when(sessionFactory.createNewSession(amountOfRounds, custom, map, map2, notes)).thenReturn(sessionMock);
    when(networkChecker.isDeviceConnected()).thenResolve(true);
    when(repository.insertSession(sessionMock)).thenResolve(sessionMock);
    when(gateway.createSession(amountOfRounds, custom, map, map2, notes)).thenResolve(syncedSessionMock);

    when(authManager.isAuthenticated()).thenResolve(new AuthResponse('', true));
    await subject.createSession(amountOfRounds, custom, map, map2, notes).then((result) => {
        verify(gateway.createSession(amountOfRounds, custom, map, map2, notes)).once();
        verify(repository.insertSession(sessionMock)).once();
        verify(repository.updateSession(syncedSessionMock)).once();
        expect(result).toEqual(syncedSessionMock);
        done();
    });
});

