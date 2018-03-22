import {AuthAction} from "../../app/globals/AuthAction";
import {instance, mock, verify, when} from "ts-mockito";
import {Dispatcher} from "../../app/common/Dispatcher";
import {AuthManagerImpl} from "../../domain/auth/impl/AuthManagerImpl";
import {AuthResponse} from "../../domain/auth/model/AuthResponse";
import {ActionType} from "../../app/common/ActionType";

const dispatcher = mock(Dispatcher);
const authManager = mock(AuthManagerImpl);
const subject = new AuthAction(instance(dispatcher), instance(authManager));

it('signs in successfully', async (done) => {
    const email = '';
    const pw = '';
    const authResponse = mock(AuthResponse);
    const authResponseInstance = instance(authResponse);
    when(authResponse.successful).thenReturn(true);

    when(authManager.signIn(email, pw)).thenResolve(authResponseInstance);
    await subject.signIn(email, pw);

    verify(dispatcher.dispatch(ActionType.ON_LOG_IN))
        .calledBefore(dispatcher.dispatch(ActionType.ON_LOG_IN_SUCCESS, authResponseInstance));
    done();
});

it('signs in fails', async (done) => {
    const email = '';
    const pw = '';
    const authResponse = mock(AuthResponse);
    when(authResponse.successful).thenReturn(false);

    when(authManager.signIn(email, pw)).thenReject('');
    await subject.signIn(email, pw);

    verify(dispatcher.dispatch(ActionType.ON_LOG_IN))
        .calledBefore(dispatcher.dispatch(ActionType.ON_LOG_IN_FAIL));
    done();
});