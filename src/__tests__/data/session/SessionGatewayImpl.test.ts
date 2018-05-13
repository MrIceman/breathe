import {SessionGatewayImpl} from "../../../data/session/SessionGatewayImpl";
import {SessionResponseMapper} from "../../../data/SessionResponseMapper";
import {anything, instance, mock, verify, when} from "ts-mockito";
import {HttpService} from "../../../data/http/HttpService";
import {Session} from "../../../data/session/SessionEntity";
import {HttpResponse} from "../../../data/HttpResponse";
import {ErrorResponseMapper} from "../../../domain/common/ErrorResponseMapper";
import {HttpRequestFactory} from "../../../data/http/HttpRequestFactory";
import {HttpRequest} from "../../../data/HttpRequest";

const responseMapper = mock(SessionResponseMapper);
const httpService = mock(HttpService);
const errorMapper = mock(ErrorResponseMapper);
const httpRequestFactory = mock(HttpRequestFactory);
const session = mock(Session);

const subject = new SessionGatewayImpl(instance(responseMapper), instance(httpService), instance(errorMapper), instance(httpRequestFactory));

it('makes a successful create request', async () => {
    const httpResponse = mock(HttpResponse);
    const httpRequest = mock(HttpRequest);
    const session = instance(mock(Session));

    when(httpRequestFactory.makeCreateSessionRequest(session)).thenReturn(instance(httpRequest));
    when(httpService.makeSignedRequest(instance(httpRequest))).thenResolve(instance(httpResponse));

    await subject.createSession(session);
    verify(responseMapper.mapSession(instance(httpResponse))).once();
});

it('gets all sessions of user correctly', async () => {
    const result = await subject.getAllSessions();
    expect(result).toEqual([instance(session), instance(session)])
});