var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { anyNumber, deepEqual, instance, mock, when } from "ts-mockito";
import { AuthManagerImpl } from "../../domain/auth/impl/AuthManagerImpl";
import { LocalRepository } from "../../data/repository/LocalRepository";
import { AuthRequest } from "../../domain/auth/model/AuthRequest";
import { AuthEntity } from "../../model/entity/AuthEntity";
import { AuthResponse } from "../../domain/auth/model/AuthResponse";
import { AuthResponseMapper } from "../../domain/common/AuthResponseMapper";
import { ErrorEntity } from "../../model/entity/ErrorEntity";
import { AuthGatewayImpl } from "../../data/auth/AuthGatewayImpl";
import { ErrorResponse } from "../../model/domain/ErrorResponse";
import { ErrorResponseMapper } from "../../domain/common/ErrorResponseMapper";
import { AuthRequestMapper } from "../../domain/common/AuthRequestMapper";
const gateway = mock(AuthGatewayImpl);
const inMemoryRepository = mock(LocalRepository);
const mapper = mock(AuthResponseMapper);
const errorMapper = mock(ErrorResponseMapper);
const requestMapper = mock(AuthRequestMapper);
const subject = new AuthManagerImpl(instance(gateway), instance(inMemoryRepository), instance(mapper), instance(requestMapper), instance(errorMapper));
it('successfully maps AuthEntity to AuthResponse when sign in correct', (done) => __awaiter(this, void 0, void 0, function* () {
    const authEntity = new AuthEntity('123');
    const authResponse = instance(mock(AuthResponse));
    const authRequest = instance(mock(AuthRequest));
    const email = '1';
    const pw = '2;';
    when(requestMapper.mapRequest(email, pw)).thenReturn(authRequest);
    when(gateway.signIn(authRequest)).thenResolve(authEntity);
    when(mapper.mapEntity(authEntity)).thenReturn(authResponse);
    yield subject.signIn(email, pw).then((result) => {
        expect(result).toEqual(authResponse);
        done();
    });
}));
it('maps a Gateway Error correctly into a Domain Error', (done) => __awaiter(this, void 0, void 0, function* () {
    const wrongPasswordEntityMock = (mock(ErrorEntity));
    const wrongPasswordEntityInstance = instance(wrongPasswordEntityMock);
    const wrongPasswordResponse = instance(mock(ErrorResponse));
    const authRequest = instance(mock(AuthRequest));
    const email = '1';
    const pw = '2;';
    when(requestMapper.mapRequest(email, pw)).thenReturn(authRequest);
    when(wrongPasswordEntityMock.code).thenReturn(anyNumber());
    when(errorMapper.mapEntity(wrongPasswordEntityInstance)).thenReturn(wrongPasswordResponse);
    when(gateway.signIn(authRequest)).thenReject(wrongPasswordEntityInstance);
    subject.signIn(email, pw).then((_result) => {
    }, (error) => {
        expect(error).toEqual(wrongPasswordResponse);
        done();
    });
}));
it('tryAutoLogIn returns a successful response when it a JWT token is persisted', (done) => __awaiter(this, void 0, void 0, function* () {
    when(inMemoryRepository.isAuthTokenPersisted()).thenResolve(true);
    subject.tryAutoLogIn().then((result) => {
        expect(result).toEqual(true);
        done();
    });
}));
it('tryAutoLogIn returns a false response when no JWT token is persisted', (done) => __awaiter(this, void 0, void 0, function* () {
    when(inMemoryRepository.isAuthTokenPersisted()).thenResolve(false);
    subject.tryAutoLogIn().then((result) => {
        expect(result).toEqual(false);
        done();
    });
}));
it('creates an account successfully', (done) => {
    const authRequest = instance(mock(AuthRequest));
    const authEntity = instance(mock(AuthEntity));
    const authResponse = instance(mock(AuthResponse));
    const email = '';
    const pw = '';
    const displayName = '';
    when(requestMapper.mapRequest(email, pw, displayName)).thenReturn(authRequest);
    when(gateway.register(authRequest)).thenResolve(authEntity);
    when(mapper.mapEntity(authEntity)).thenReturn(authResponse);
    subject.createAccount(email, pw, displayName).then((result) => {
        expect(result).toEqual(authResponse);
        done();
    });
});
it('creates not an account successfully when backend returns error', (done) => __awaiter(this, void 0, void 0, function* () {
    const authRequest = instance(mock(AuthRequest));
    const authErrorEntity = instance(mock(ErrorEntity));
    const authErrorResponse = instance(mock(ErrorResponse));
    const email = '';
    const pw = '';
    const displayName = '';
    when(requestMapper.mapRequest(email, pw, displayName)).thenReturn(authRequest);
    when(gateway.register(authRequest)).thenReject(authErrorEntity);
    when(errorMapper.mapEntity(authErrorEntity)).thenReturn(authErrorResponse);
    subject.createAccount(email, pw, displayName).then((_result) => {
        fail();
    }, (error) => {
        expect(error).toEqual(authErrorResponse);
        done();
    });
}));
it('caches a token successfully inside the local repository', (done) => __awaiter(this, void 0, void 0, function* () {
    const token = '';
    when(inMemoryRepository.refreshAuthToken(deepEqual(token))).thenResolve(token);
    subject.cacheToken(token).then((result) => {
        expect(result).toEqual(token);
        done();
    });
}));
it('caches not token successfully inside the local repository when repository rejects', (done) => __awaiter(this, void 0, void 0, function* () {
    const token = '';
    const errorEntity = instance(mock(ErrorEntity));
    const errorResponse = instance(mock(ErrorResponse));
    when(errorMapper.mapEntity(errorEntity)).thenReturn(errorResponse);
    when(inMemoryRepository.refreshAuthToken(deepEqual(token))).thenReject(errorEntity);
    subject.cacheToken(token).then((_) => {
    }, (error) => {
        expect(error).toBe(errorResponse);
        done();
    });
}));
it('signs out correctly', (done) => __awaiter(this, void 0, void 0, function* () {
    when(inMemoryRepository.clearAuthToken()).thenResolve(true);
    subject.signOut().then((result) => {
        expect(result).toBe(true);
        done();
    });
}));
it('fails sign out', (done) => __awaiter(this, void 0, void 0, function* () {
    when(inMemoryRepository.clearAuthToken()).thenReject(false);
    subject.signOut().then((_) => {
    }, (result) => {
        expect(result).toBe(false);
        done();
    });
}));
//# sourceMappingURL=AuthManager.test.js.map