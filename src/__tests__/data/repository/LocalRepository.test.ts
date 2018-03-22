import {LocalDataSource} from "../../../data/repository/LocalDataSource";
import {LocalRepository} from "../../../data/repository/LocalRepository";
import {Constants} from "../../../utils/Constants";
import StorageMock from "../../mock/StorageMock";
import {instance, mock, when} from "ts-mockito";
import {Session} from "../../../data/session/Session";
import {SessionMapper} from "../../../data/session/SessionMapper";

const dataSource: LocalDataSource = new StorageMock();
const sessionMapperMock = mock(SessionMapper);
const subject = LocalRepository.getNewInstanceWithDataSource(dataSource, instance(sessionMapperMock));


beforeEach(async () => {
    await dataSource.clear();
});

it('returns a true if token is persisted and isAuthTokenPersisted is called', async (done) => {
    await dataSource.setItem(Constants.JWT_TOKEN_KEY, '123');
    subject.isAuthTokenPersisted().then((result: boolean) => {
        expect(result).toBe(true);
        done();
    });
});

it('returns a false if token is not persisted and isAuthTokenPersisted is called', async (done) => {
    await subject.isAuthTokenPersisted().then((result: boolean) => {
        expect(result).toBe(false);
        done();
    });
});

it('refreshes a token successfully', async (done) => {
    subject.refreshAuthToken('123').then((result) => {
        expect(result).toEqual('123');
        done();
    });

});

it('caches a session correctly', (done) => {
    const sessionMock = instance(mock(Session));
    subject.insertSession(sessionMock).then((result) => {
        expect(result).toEqual(sessionMock);
        done();
    });
});

it('session gets persisted correctly', async (done) => {
    const sessionMock = mock(Session);
    const sessionMock2 = mock(Session);
    const session = instance(sessionMock);
    const session2 = instance(sessionMock2);
    const session_str_value = '1_2';

    when(sessionMock.toJSONString()).thenReturn(session_str_value);
    when(sessionMock.id).thenReturn(1);
    when(sessionMock2.id).thenReturn(2);
    when(sessionMapperMock.mapSession(session_str_value)).thenReturn(session);
    await subject.insertSession(session);
    await subject.insertSession(session2).then(
        (result) => {
            expect(result).toEqual(session2);
        }
    );

    await subject.getPersistedSessionIds().then((persistedIds) => {
        expect(persistedIds).toEqual(['1', '2']);
    });

    done();
});

it('persists multiple session ids within the keymap', async (done) => {
    await subject.addSessionIdToMap(1);
    await subject.addSessionIdToMap(2).then((result) => {
        expect(result).toEqual('1,2');
        done();
    });
});

it('gets a valid Array of Sessions when calling getAllSessions()', async (done) => {
    const sessionMock = mock(Session);
    const sessionMock2 = mock(Session);
    const session = instance(sessionMock);
    const session2 = instance(sessionMock2);
    const session_str_1 = '{your momma}';
    const session_str_2 = '{your poppa}';

    when(sessionMock.toJSONString()).thenReturn(session_str_1);
    when(sessionMock2.toJSONString()).thenReturn(session_str_2);
    when(sessionMapperMock.mapSession(session_str_1)).thenReturn(session);
    when(sessionMapperMock.mapSession(session_str_2)).thenReturn(session2);

    when(sessionMock.id).thenReturn(1);
    when(sessionMock2.id).thenReturn(2);

    await subject.insertSession(session);
    await subject.insertSession(session2);

    subject.getAllSessions().then((result) => {
        expect(result).toEqual([session, session2]);
        done();
    })
});

it('gets an empty Array of Sessions when calling getAllSessions() and no sessions persisted', async (done) => {
    subject.getAllSessions().then((result) => {
        expect(result).toEqual([]);
        done();
    })
});

it('clears an auth token successfully', async (done) => {
    await subject.refreshAuthToken('123');
    await subject.clearAuthToken();
    subject.getAuthToken().then((_) => {
        fail();
    }, () => {
        done();
    });
});