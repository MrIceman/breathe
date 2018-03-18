import {anyNumber, deepEqual, instance, mock, when} from "ts-mockito";
import {AuthManagerImpl} from "../../domain/auth/impl/AuthManagerImpl";
import {LocalRepository} from "../../data/repository/LocalRepository";
import {AuthRequest} from "../../domain/auth/model/AuthRequest";
import {AuthEntity} from "../../model/entity/AuthEntity";
import {AuthResponse} from "../../domain/auth/model/AuthResponse";
import {AuthResponseMapper} from "../../domain/common/AuthResponseMapper";
import {ErrorEntity} from "../../model/entity/ErrorEntity";
import {AuthGateway} from "../../domain/auth/AuthGateway";
import {AuthGatewayImpl} from "../../data/auth/AuthGatewayImpl";
import {ErrorResponse} from "../../model/domain/ErrorResponse";
import {ErrorResponseMapper} from "../../domain/common/ErrorResponseMapper";

const gateway: AuthGateway = mock(AuthGatewayImpl);
const inMemoryRepository = mock(LocalRepository);
const mapper = mock(AuthResponseMapper);
const errorMapper = mock(ErrorResponseMapper);
const subject = new AuthManagerImpl(instance(gateway), instance(inMemoryRepository), instance(mapper), instance(errorMapper));

it('successfully maps AuthEntity to AuthResponse when sign in correct', async (done) => {
    const authEntity = new AuthEntity('123');
    const authResponse = instance(mock(AuthResponse));
    when(gateway.signIn(deepEqual(new AuthRequest('1@1.com', '123', 'peter'))))
        .thenResolve(authEntity);

    when(mapper.mapEntity(authEntity)).thenReturn(authResponse);

    await subject.signIn(new AuthRequest('1@1.com', '123', 'peter')).then(
        (result: AuthResponse) => {
            expect(result).toEqual(authResponse);
            done();
        }
    );
});

it('maps a Gateway Error correctly into a Domain Error', (done) => {
    const wrongPasswordEntityMock = (mock(ErrorEntity));
    const wrongPasswordEntityInstance = instance(wrongPasswordEntityMock);
    const wrongPasswordResponse = instance(mock(ErrorResponse));
    when(wrongPasswordEntityMock.code).thenReturn(anyNumber());
    when(errorMapper.mapEntity(wrongPasswordEntityInstance)).thenReturn(wrongPasswordResponse);
    when(gateway.signIn(deepEqual(new AuthRequest('1@1.com', '123', 'peter'))))
        .thenReject(wrongPasswordEntityInstance);

    subject.signIn(new AuthRequest('1@1.com', '123', 'peter')).then(
        (_result) => {
        }, (error) => {
            expect(error).toEqual(wrongPasswordResponse);
            done();
        }
    );
});

it('tryAutoLogIn returns a successful response when it a JWT token is persisted', (done) => {
    when(inMemoryRepository.isAuthTokenPersisted()).thenResolve(true);

    subject.tryAutoLogIn().then((result) => {
        expect(result).toEqual(true);
        done();
    });
});

it('tryAutoLogIn returns a false response when no JWT token is persisted', (done) => {
    when(inMemoryRepository.isAuthTokenPersisted()).thenResolve(false);

    subject.tryAutoLogIn().then((result) => {
        expect(result).toEqual(false);
        done();
    });
});

it('creates an account successfully', (done) => {
    const authRequest = instance(mock(AuthRequest));
    const authEntity = instance(mock(AuthEntity));
    const authResponse = instance(mock(AuthResponse));

    when(gateway.register(authRequest)).thenResolve(authEntity);
    when(mapper.mapEntity(authEntity)).thenReturn(authResponse);

    subject.createAccount(authRequest).then((result) => {
        expect(result).toEqual(authResponse);
        done();
    });
});

it('creates not an account successfully when backend returns error', (done) => {
    const authRequest = instance(mock(AuthRequest));
    const authErrorEntity = instance(mock(ErrorEntity));
    const authErrorResponse = instance(mock(ErrorResponse));

    when(gateway.register(authRequest)).thenReject(authErrorEntity);
    when(errorMapper.mapEntity(authErrorEntity)).thenReturn(authErrorResponse);

    subject.createAccount(authRequest).then((_result) => {
        fail();
    }, (error) => {
        expect(error).toEqual(authErrorResponse);
        done();
    });

});

it('caches a token successfully inside the local repository', async (done) => {
    const token = '';
    when(inMemoryRepository.refreshAuthToken(deepEqual(token))).thenResolve(token);
    subject.cacheToken(token).then((result) => {
        expect(result).toEqual(token);
        done();
    })
});

it('caches not token successfully inside the local repository when repository rejects', async (done) => {
    const token = '';
    const errorEntity = instance(mock(ErrorEntity));
    const errorResponse = instance(mock(ErrorResponse));
    when(errorMapper.mapEntity(errorEntity)).thenReturn(errorResponse);
    when(inMemoryRepository.refreshAuthToken(deepEqual(token))).thenReject(errorEntity);

    subject.cacheToken(token).then((_) => {
    }, (error) => {
        expect(error).toBe(errorResponse);
        done();
    })
});

it('signs out correctly', (done) => {
    when(inMemoryRepository.invalidateSession()).thenResolve(true);

    subject.signOut().then((result) => {
        expect(result).toBe(true);
        done();
    })
});


it('fails sign out', (done) => {
    when(inMemoryRepository.invalidateSession()).thenReject(false);

    subject.signOut().then((_) => {
    }, (result) => {
        expect(result).toBe(false);
        done();
    })
});