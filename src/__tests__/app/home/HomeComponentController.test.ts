import {HomeComponentController} from "../../../app/home/HomeComponentController";
import {instance, mock, verify, when} from "ts-mockito";
import {HomeComponent} from "../../../app/home/HomeComponent";
import {AuthManagerImpl} from "../../../domain/auth/impl/AuthManagerImpl";
import {LocalRepository} from "../../../data/repository/LocalRepository";
import {AuthResponse} from "../../../domain/auth/model/AuthResponse";

const component = mock(HomeComponent);
const authManager = mock(AuthManagerImpl);
const repository = mock(LocalRepository);

const subject = new HomeComponentController(instance(component), instance(authManager), instance(repository));

it('caches token when sign up successful', async () => {
    const username = 'sandy';
    const email = 'sandra@sandra.com';
    const pw = 'martinYmindy';
    const token = '1234';
    const authResponse = new AuthResponse(token, true);

    when(authManager.createAccount(email, pw, username)).thenResolve(authResponse);
    when(repository.refreshAuthToken(token)).thenResolve('anyhtnigsio');

    await subject.signUp(email, pw, username);

    verify(repository.refreshAuthToken(token)).once();
    verify(component.displayError('')).once();
});