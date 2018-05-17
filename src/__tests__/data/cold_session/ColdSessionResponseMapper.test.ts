import {ColdSessionResponseMapper} from "../../../data/cold_session/ColdSessionResponseMapper";
import {ColdSessionEntity} from "../../../model/cold_session/ColdSessionEntity";

const subject = new ColdSessionResponseMapper();
const json = `
{
    "createdOn": "Wed, 16 May 2018 22:05:41 GMT",
    "notes": "zzz", 
    "duration": 120,
    "userId": 1,
    "type": "shower",
    "uuid": "45e1fa90-5955-11e8-ab41-39e934700ff3"
}`;

it('maps a cold session entity out of json', () => {
    const result = subject.parseEntity(JSON.parse(json));
    expect(result).toEqual(new ColdSessionEntity("45e1fa90-5955-11e8-ab41-39e934700ff3",
        new Date("Wed, 16 May 2018 22:05:41 GMT").getTime(),
        120,
        "shower",
        "zzz"))
});