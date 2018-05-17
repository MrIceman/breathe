import {PracticeGateway} from "../PracticeGateway";
import {ColdSessionEntity} from "../../model/cold_session/ColdSessionEntity";
import {ColdSessionRequest} from "../../model/request/ColdSessionRequest";

export interface ColdSessionGateway extends PracticeGateway<ColdSessionEntity, ColdSessionRequest>{

}