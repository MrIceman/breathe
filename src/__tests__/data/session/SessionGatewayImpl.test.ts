import {SessionGatewayImpl} from "../../../data/session/SessionGatewayImpl";
import {SessionResponseMapper} from "../../../domain/session/SessionResponseMapper";
import {anything, instance, mock, verify, when} from "ts-mockito";
import {HttpService} from "../../../data/http/HttpService";
import {Session} from "../../../data/session/Session";
import {HttpResponse} from "../../../data/HttpResponse";

const responseMapper = mock(SessionResponseMapper);
const httpService = mock(HttpService);
const subject = new SessionGatewayImpl(instance(responseMapper), instance(httpService));

it('makes a successful create request', async () => {
    const session = mock(Session);
    const httpResponse = mock(HttpResponse);
    when(httpService.makeSignedRequest(anything())).thenResolve(instance(httpResponse));
    await subject.createSession(instance(session));
    verify(responseMapper.mapSession(instance(httpResponse))).once();
});