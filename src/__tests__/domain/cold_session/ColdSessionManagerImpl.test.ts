import {instance, mock, reset, verify, when} from "ts-mockito";
import {LocalRepository} from "../../../data/repository/LocalRepository";
import {NetworkChecker} from "../../../utils/NetworkChecker";
import {SessionFactory} from "../../../domain/session/model/SessionFactory";
import {AuthManagerImpl} from "../../../domain/auth/impl/AuthManagerImpl";
import {AuthResponse} from "../../../domain/auth/model/AuthResponse";
import {ColdSessionGateway} from "../../../domain/cold_session/ColdSessionGateway";
import {ColdSessionEntity} from "../../../model/cold_session/ColdSessionEntity";
import {ColdSessionRequest} from "../../../model/request/ColdSessionRequest";
import {ColdSessionManagerImpl} from "../../../domain/cold_session/impl/ColdSessionManagerImpl";
import {ColdSessionRequestFactory} from "../../../domain/cold_session/model/ColdSessionFactory";

class GatewayMock implements ColdSessionGateway {

    createSession(session: ColdSessionRequest): Promise<ColdSessionEntity> {
        return undefined;
    }

    getAllSessions(): Promise<Array<ColdSessionEntity>> {
        return undefined;
    }

    getSessionById(id: string): Promise<ColdSessionEntity> {
        return undefined;
    }

    updateSession(session: ColdSessionRequest): Promise<ColdSessionEntity> {
        return undefined;
    }

}

const gateway = mock(GatewayMock);
const repository = mock(LocalRepository);
const networkChecker = mock(NetworkChecker);
const authManager = mock(AuthManagerImpl);
const requestFactory = mock(ColdSessionRequestFactory);
const subject = new ColdSessionManagerImpl(instance(gateway), instance(repository), instance(networkChecker), instance(requestFactory), instance(authManager));

beforeEach(() => {
    reset(repository);
});
it('stores a session only in cache and does no gateway call when no internet available on phone', async () => {
    let duration = 0;
    let type = 'shower';
    let notes = '';
    const sessionRequest = instance(mock(ColdSessionRequest));
    const sessionEntity = instance(mock(ColdSessionEntity));
    const sessionResultEntity = instance(mock(ColdSessionEntity));
    when(repository.persistColdSession(duration, type, notes)).thenResolve(sessionEntity);
    when(networkChecker.isDeviceConnected()).thenResolve(true);
    when(authManager.isAuthenticated()).thenResolve(new AuthResponse('', true));
    when(gateway.createSession(sessionRequest)).thenResolve(sessionResultEntity);
    when(repository.updateColdSession(sessionResultEntity)).thenResolve(sessionResultEntity);
    when(requestFactory.makeCreateSessionRequest(sessionEntity)).thenReturn(sessionRequest);

    const result = await subject.createAndSaveSession(duration, type, notes);

    expect(result).toEqual(sessionResultEntity);
    verify(repository.updateColdSession(sessionResultEntity)).once();

});
/*


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
*/