import {SessionManagerImpl} from "../../../domain/session/impl/SessionManagerImpl";
import {instance, mock, verify, when} from "ts-mockito";
import {SessionGateway} from "../../../domain/session/SessionGateway";
import {Session} from "../../../data/session/Session";
import {LocalRepository} from "../../../data/repository/LocalRepository";
import {NetworkChecker} from "../../../utils/NetworkChecker";
import {SessionFactory} from "../../../data/session/SessionFactory";


class GatewayMock implements SessionGateway {
    getSessionById() {
    }

    createSession(_amountOfRounds: number, _custom: boolean, _retentionTimeMap: Map<number, number>, _amountOfBreathsPerRetention: Map<number, number>, _notes: string): Promise<Session> {
        return undefined;
    }

    createSessionGlobal(_session: Session): Session {
        return undefined;
    }

}

const gateway = mock(GatewayMock);
const repository = mock(LocalRepository);
const networkChecker = mock(NetworkChecker);
const sessionFactory = mock(SessionFactory);
const subject = new SessionManagerImpl(instance(gateway), instance(repository), instance(networkChecker), instance(sessionFactory));

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
    subject.createSessionLocal(amountOfRounds, custom, map, map2, notes).then((result) => {
        verify(gateway.createSession(amountOfRounds, custom, map, map2, notes)).never();
        verify(repository.insertSession(sessionMock)).once();
        expect(result).toEqual(sessionMock);
        done();
    });
});