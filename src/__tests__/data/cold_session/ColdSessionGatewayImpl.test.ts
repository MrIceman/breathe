import {SessionRequest} from "../../../model/request/SessionRequest";
import {SessionGatewayImpl} from "../../../data/session/SessionGatewayImpl";
import {SessionResponseMapper} from "../../../data/session/SessionResponseMapper";
import {anything, deepEqual, instance, mock, verify, when} from "ts-mockito";
import {HttpService} from "../../../data/http/HttpService";
import {HttpResponse} from "../../../data/HttpResponse";
import {ErrorResponseMapper} from "../../../domain/common/ErrorResponseMapper";
import {SessionEntity} from "../../../model/session/SessionEntity";
import {ColdSessionGatewayImpl} from "../../../data/cold_session/ColdSessionGatewayImpl";
import {ColdSessionResponseMapper} from "../../../data/cold_session/ColdSessionResponseMapper";
import {ColdSessionEntity} from "../../../model/cold_session/ColdSessionEntity";
import {ColdSessionRequest} from "../../../model/request/ColdSessionRequest";


const responseMapper = mock(ColdSessionResponseMapper);
const httpService = mock(HttpService);
const errorMapper = mock(ErrorResponseMapper);
const sessionEntity = mock(ColdSessionEntity);

const subject = new ColdSessionGatewayImpl(instance(responseMapper), instance(httpService), instance(errorMapper));

it('makes a successful create request', async () => {
    const httpResponseMock = mock(HttpResponse);
    const sessionRequest = instance(mock(ColdSessionRequest));
    const httpResponse = instance(httpResponseMock);
    when(httpResponseMock.data).thenReturn('');
    when(httpService.makeSignedRequest(sessionRequest)).thenResolve(httpResponse);

    await subject.createSession(sessionRequest);
    verify(responseMapper.parseEntity(httpResponse.data)).once();
});

/*
it('gets all sessions of user correctly', async () => {
    const httpResponse = instance(mock(HttpResponse));
    const searchRequest = new SessionRequest(undefined, undefined, undefined, '/session/search', 'GET');
    when(httpService.makeSignedRequest(anything())).thenResolve(httpResponse);
    const expected = [instance(sessionEntity), instance(sessionEntity)];

    when(responseMapper.parseSessionEntityArray(httpResponse)).thenReturn(expected);
    const result = await subject.getAllSessions();
    expect(result).toEqual(expected);
});*/