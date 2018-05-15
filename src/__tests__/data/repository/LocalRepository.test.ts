import {LocalDataSource} from "../../../data/repository/LocalDataSource";
import {LocalRepository} from "../../../data/repository/LocalRepository";
import {Constants} from "../../../utils/Constants";
import StorageMock from "../../mock/StorageMock";
import {deepEqual, instance, mock, when} from "ts-mockito";
import {SessionEntityMapper} from "../../../data/repository/SessionEntityMapper";
import {SessionEntity} from "../../../model/session/SessionEntity";
import {SessionEntityFactory} from "../../../model/session/SessionEntityFactory";

const dataSource: LocalDataSource = new StorageMock();
const sessionMapperMock = mock(SessionEntityMapper);
const sessionEntityFactory = mock(SessionEntityFactory);
const subject = LocalRepository.makeInstance(dataSource, instance(sessionMapperMock), instance(sessionEntityFactory));


beforeEach(async () => {
    await dataSource.clear();
});

it('returns a true if token is persisted and isAuthTokenPersisted is called', async (done) => {
    await dataSource.setItem(Constants.JWT_TOKEN_KEY, '123');
    subject.isAuthTokenPersisted().then((result: boolean) => {
        expect(result).toBe(true);
        done();
    }, (reject) => fail());
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
    const sessionMock = instance(mock(SessionEntity));
    subject.insertSessionEntity(sessionMock).then((result) => {
        expect(result).toEqual(sessionMock);
        done();
    });
});

it('session gets persisted correctly', async (done) => {
    const sessionMock = mock(SessionEntity);
    const sessionMock2 = mock(SessionEntity);
    const session = instance(sessionMock);
    const session2 = instance(sessionMock2);

    when(sessionMock.uuid).thenReturn('13');
    when(sessionMock2.uuid).thenReturn('2');
    await subject.insertSessionEntity(session);
    await subject.insertSessionEntity(session2).then(
        (result) => {
            expect(result).toEqual(session2);
        }
    );

    await subject.getPersistedSessionIds().then((persistedIds) => {
        expect(persistedIds).toEqual(['13', '2']);
    });

    done();
});

it('persists multiple session ids within the keymap', async (done) => {
    const id1 = 'askof#üsaq1y-';
    const id2 = 'asopfkwq´´??__';
    await subject.addSessionIdToMap(id1);
    await subject.addSessionIdToMap(id2).then((result) => {
        expect(result).toEqual(`${id1},${id2}`);
        done();
    });
});


it('gets a valid Array of Sessions when calling getAllSessions()', async () => {
    const sessionMock = mock(SessionEntity);
    const sessionMock2 = mock(SessionEntity);
    const session = instance(sessionMock);
    const session2 = instance(sessionMock2);
    const session_str_1 = '{your momma}';
    const session_str_2 = '{your poppa}';
    when(sessionMock.toJSONString()).thenReturn(session_str_1);
    when(sessionMock2.toJSONString()).thenReturn(session_str_2);
    when(sessionMapperMock.mapSession(session_str_1)).thenReturn(session);
    when(sessionMapperMock.mapSession(session_str_2)).thenReturn(session2);

    when(sessionMock.uuid).thenReturn('1');
    when(sessionMock2.uuid).thenReturn('2');

    await subject.insertSessionEntity(session);
    await subject.insertSessionEntity(session2);

    await subject.getAllPersistedSessionEntities().then((result) => {
        expect(result).toEqual([session, session2]);
    })
});
/*
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

it('updates an existing session without changing its local id', async (done) => {
   const sessionMock = mock(SessionEntity);
   const session = instance(sessionMock);
   const session_str_1 = '{your momma}';

   when(sessionMock.toJSONString()).thenReturn(session_str_1);
   when(sessionMapperMock.parseSessionEntity(session_str_1)).thenReturn(session);

   when(sessionMock.id).thenReturn(1);

   await subject.insertSessionEntity(session);
   await subject.getSessionById(session.id).then((result) => {
       expect(result).toEqual(session);
   });

   session.globalId = 2;

   await subject.updateSession(session);

   await subject.getSessionById(session.id).then((result) => {
       expect(result.globalId).toEqual(2);
       done();
   });
});

it('caches an username successfully', async (done) => {
   const username = 'spiderman';
   const result = await subject.cacheUsername(username);
   expect(result).toEqual(username);
   done();
});

it('gets a cached username successfully', async (done) => {
   const username = 'spiderman';
   await subject.cacheUsername(username);
   const result = await subject.getUsername();
   expect(result).toEqual(username);
   done();
});*/