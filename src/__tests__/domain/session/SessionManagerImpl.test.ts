import {SessionGateway} from "../../../domain/session/SessionGateway";
import {SessionEntity} from "../../../model/session/SessionEntity";
import {instance, mock, reset, verify, when} from "ts-mockito";
import {LocalRepository} from "../../../data/repository/LocalRepository";
import {NetworkChecker} from "../../../utils/NetworkChecker";
import {SessionFactory} from "../../../domain/session/model/SessionFactory";
import {AuthManagerImpl} from "../../../domain/auth/impl/AuthManagerImpl";
import {SessionManagerImpl} from "../../../domain/session/impl/SessionManagerImpl";
import {AuthResponse} from "../../../domain/auth/model/AuthResponse";
import {SessionRequest} from "../../../model/request/SessionRequest";
import {ErrorEntity} from "../../../model/entity/ErrorEntity";

class GatewayMock implements SessionGateway {
    getAllSessions(): Promise<Array<SessionEntity>> {
        return undefined;
    }

    createSession(session: SessionRequest): Promise<SessionEntity> {
        return undefined;
    }

    getSessionById(id: string): Promise<SessionEntity> {
        return undefined;
    }

    updateSession(session: SessionRequest): Promise<SessionEntity> {
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
it('stores a session only in cache and does no gateway call when no internet available on phone', async () => {
    let amountOfRounds = 0;
    let custom = false;
    let map = new Map();
    let map2 = new Map();
    let notes = '';
    const sessionRequest = instance(mock(SessionRequest));
    const sessionEntity = instance(mock(SessionEntity));
    const sessionResultEntity = instance(mock(SessionEntity));
    when(repository.persistSession(amountOfRounds, custom, map, map2, notes)).thenResolve(sessionEntity);
    when(networkChecker.isDeviceConnected()).thenResolve(true);
    when(authManager.isAuthenticated()).thenResolve(new AuthResponse('', true));
    when(sessionFactory.makeSessionRequest(sessionEntity)).thenReturn(sessionRequest);
    when(gateway.createSession(sessionRequest)).thenResolve(sessionResultEntity);
    when(repository.updateSession(sessionResultEntity)).thenResolve(sessionResultEntity);

    const result = await subject.createAndSaveSession(amountOfRounds, custom, map, map2, notes);

    expect(result).toEqual(sessionResultEntity);
    verify(repository.updateSession(sessionResultEntity)).once();

});


it('stores a session only in cache and does no gateway call when internet is available on phone but user is not signed in', async () => {
    let amountOfRounds = 0;
    let custom = false;
    let map = new Map();
    let map2 = new Map();
    let notes = '';
    const sessionEntity = instance(mock(SessionEntity));
    const sessionResultEntity = instance(mock(SessionEntity));
    when(repository.persistSession(amountOfRounds, custom, map, map2, notes)).thenResolve(sessionEntity);
    when(networkChecker.isDeviceConnected()).thenResolve(true);
    when(repository.updateSession(sessionResultEntity)).thenResolve(sessionResultEntity);
    when(authManager.isAuthenticated()).thenReject(new ErrorEntity(-1, ''));

    const result = await subject.createAndSaveSession(amountOfRounds, custom, map, map2, notes);

    expect(result).toEqual(sessionEntity);
});


it('returns an empty result from cache when no network connection is available', async () => {

    when(networkChecker.isDeviceConnected()).thenResolve(false);
    when(authManager.isAuthenticated()).thenResolve(new AuthResponse(undefined, false, 0));
    when(repository.getAllPersistedSessionEntities()).thenResolve([]);
    const result = await subject.getAllSessions();

    expect(result).toEqual([]);
});


it('gets a non empty session list from cache when no network connection is available', async () => {
    const session = instance(mock(SessionEntity));
    when(networkChecker.isDeviceConnected()).thenResolve(false);
    when(repository.getAllPersistedSessionEntities()).thenResolve([session]);
    const result = await subject.getAllSessions();

    expect(result).toEqual([session]);
    verify(gateway.getAllSessions()).never();
});

it('gets a non empty session list from cache when network connection is available but user is not authenticated', async () => {
    const session = instance(mock(SessionEntity));
    when(networkChecker.isDeviceConnected()).thenResolve(true);
    when(repository.getAllPersistedSessionEntities()).thenResolve([session]);
    when(authManager.isAuthenticated()).thenResolve(new AuthResponse('', false));
    const result = await subject.getAllSessions();

    expect(result).toEqual([session]);
    verify(gateway.getAllSessions()).never();
});

it('calls session list from API when user is signed in', async () => {
    const session = instance(mock(SessionEntity));
    reset(repository);
    when(networkChecker.isDeviceConnected()).thenResolve(true);
    when(gateway.getAllSessions()).thenResolve([session]);
    when(authManager.isAuthenticated()).thenResolve(new AuthResponse('', true));
    const result = await subject.getAllSessions();
    expect(result).toEqual([session]);
    verify(gateway.getAllSessions()).once();
    verify(repository.getAllPersistedSessionEntities()).never();
});
