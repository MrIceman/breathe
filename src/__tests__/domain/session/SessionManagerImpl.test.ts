it('to do', () => {
    expect(1).toEqual(1);
});

/*
 import {SessionManagerImpl} from "../../../domain/session/impl/SessionManagerImpl";
 import {instance, mock, reset, verify, when} from "ts-mockito";
 import {SessionGateway} from "../../../domain/session/SessionGateway";
 import {LocalRepository} from "../../../data/repository/LocalRepository";
 import {NetworkChecker} from "../../../utils/NetworkChecker";
 import {SessionFactory} from "../../../domain/session/model/SessionFactory";
 import {AuthManagerImpl} from "../../../domain/auth/impl/AuthManagerImpl";
 import {AuthResponse} from "../../../domain/auth/model/AuthResponse";
 import {ErrorEntity} from "../../../model/entity/ErrorEntity";
 import {Session} from "../../../domain/session/model/Session";


 class GatewayMock implements SessionGateway {
    getAllSessions(): Promise<Array<Session>> {
        return undefined;
    }

    getSessionById(id: number): Promise<Session> {
        return undefined;
    }

    updateSession(session: Session): Promise<Session> {
        return undefined;
    }

    createSession(session: Session): Promise<Session> {
        return undefined;
    }


}

 const gateway = mock(GatewayMock);
 const repository = mock(LocalRepository);
 const networkChecker = mock(NetworkChecker);
 const sessionFactory = mock(SessionFactory);
 const authManager = mock(AuthManagerImpl);
 const subject = new SessionManagerImpl(instance(gateway), instance(repository), instance(networkChecker), instance(sessionFactory), instance(authManager));

 beforeEach(() => {
    reset(repository);
});
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

    subject.createAndSaveSession(amountOfRounds, custom, map, map2, notes).then((result) => {
        verify(gateway.createSession(sessionMock)).never();
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
    when(authManager.isAuthenticated()).thenReject(new ErrorEntity(-1, ''));

    subject.createAndSaveSession(amountOfRounds, custom, map, map2, notes).then((result) => {
        verify(gateway.createSession(sessionMock)).never();
        verify(repository.insertSession(sessionMock)).once();
        expect(result).toEqual(sessionMock);
        done();
    });
});

 it('stores a session in gateway because user is authenticated and network is available and then updates it in cache', async (done) => {
    let amountOfRounds = 0;
    let custom = false;
    let map = new Map();
    let map2 = new Map();
    let notes = '';
    const sessionMock = new Session(undefined, undefined, undefined, amountOfRounds, custom, undefined, notes);
    const syncedSessionMock = instance(mock(Session));
    when(sessionFactory.createNewSession(amountOfRounds, custom, map, map2, notes)).thenReturn(sessionMock);
    when(networkChecker.isDeviceConnected()).thenResolve(true);
    when(repository.insertSession(sessionMock)).thenResolve(sessionMock);
    when(gateway.createSession(sessionMock)).thenResolve(syncedSessionMock);
    when(authManager.isAuthenticated()).thenResolve(new AuthResponse('', true));

    await subject.createAndSaveSession(amountOfRounds, custom, map, map2, notes).then((result) => {
        verify(gateway.createSession(sessionMock)).once();
        verify(repository.insertSession(sessionMock)).once();
        verify(repository.updateSession(syncedSessionMock)).once();
        expect(result).toEqual(syncedSessionMock);
        done();
    });
});

 it('gets an empty session list from cache when no network connection is available', async (done) => {
    when(networkChecker.isDeviceConnected()).thenResolve(false);
    when(repository.getAllSessions()).thenResolve([])
    const result = await subject.getAllSessions();

    expect(result).toEqual([]);
    done();
});

 it('gets a non empty session list from cache when no network connection is available', async (done) => {
    const session = instance(mock(Session));
    when(networkChecker.isDeviceConnected()).thenResolve(false);
    when(repository.getAllSessions()).thenResolve([session])
    const result = await subject.getAllSessions();

    expect(result).toEqual([session]);
    verify(gateway.getAllSessions()).never();
    done();
});

 it('gets a non empty session list from cache when network connection is available but user is not authenticated', async (done) => {
    const session = instance(mock(Session));
    when(networkChecker.isDeviceConnected()).thenResolve(false);
    when(repository.getAllSessions()).thenResolve([session]);
    when(authManager.isAuthenticated()).thenResolve(new AuthResponse('', true));
    const result = await subject.getAllSessions();

    expect(result).toEqual([session]);
    verify(gateway.getAllSessions()).never();
    done();
});

 it('calls session list from API when user is signed in', async () => {
    const session = instance(mock(Session));
    reset(repository);
    when(networkChecker.isDeviceConnected()).thenResolve(true);
    when(gateway.getAllSessions()).thenResolve([session]);
    when(authManager.isAuthenticated()).thenResolve(new AuthResponse('', true));
    const result = await subject.getAllSessions();
    expect(result).toEqual([session]);
    verify(gateway.getAllSessions()).once();
    verify(repository.getAllSessions()).never();
});
*/