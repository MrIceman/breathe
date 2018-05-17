import {SessionEntity} from "../../model/session/SessionEntity";
import {SessionRequest} from "../../model/request/SessionRequest";
import {PracticeGateway} from "../PracticeGateway";

export interface SessionGateway extends PracticeGateway<SessionEntity, SessionRequest> {


}