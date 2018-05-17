import {SessionResponseMapper} from "../../../data/session/SessionResponseMapper";
import {SessionEntity} from "../../../model/session/SessionEntity";
import {RoundEntity} from "../../../model/session/RoundEntity";

const subject = new SessionResponseMapper();

it('maps a correct request object out of json', () => {
    const retentionTimeMap = new Map<number, number>();
    retentionTimeMap.set(1, 63);
    retentionTimeMap.set(2, 33);
    retentionTimeMap.set(3, 73);

    const amountsOfBreathsPerRound = new Map<number, number>();
    amountsOfBreathsPerRound.set(1, 15);
    amountsOfBreathsPerRound.set(2, 12);
    amountsOfBreathsPerRound.set(3, 10);

    const json = `
{
    "amountOfRounds": 1, 
    "createdOn": "Wed, 16 May 2018 22:05:41 GMT",
    "notes": "", 
    "rounds": 
        [{
           "breathes": 0,
            "createdOn": "Wed, 16 May 2018 22:05:41 GMT",
            "id": 15, 
            "inhaleHoldDuration": 0, 
            "retentionTime": 2,
             "totalTime": 0,
             "roundOrder": 1
           }
         ], 
    "userId": 1,
    "uuid": "45e1fa90-5955-11e8-ab41-39e934700ff3"
}


        `;

    const sessionResponse = JSON.parse(json);

    const request: SessionEntity = subject.parseSessionEntity(sessionResponse);
    // expect(request).toEqual(new SessionEntity(123, 3, false, retentionTimeMap, amountsOfBreathsPerRound, 'your mom',
    //    123, 321));
    expect(request).toEqual(new SessionEntity('45e1fa90-5955-11e8-ab41-39e934700ff3', new Date("Wed, 16 May 2018 22:05:41 GMT").getTime(),
        [new RoundEntity(1, 0, 2, 0,
            0, new Date('Wed, 16 May 2018 22:05:41 GMT').getTime())],
        ''));
});
