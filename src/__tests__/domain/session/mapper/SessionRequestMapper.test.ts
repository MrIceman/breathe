import {SessionRequestMapper} from "../../../../domain/session/SessionRequestMapper";
import {SessionRequest} from "../../../../domain/session/model/SessionRequest";

const subject = new SessionRequestMapper();

it('maps a correct request object out of parametsr', () => {
    const retentionTimeMap = new Map<number, number>();
    retentionTimeMap.set(1, 63);
    retentionTimeMap.set(2, 33);
    retentionTimeMap.set(2, 73);

    const amountsOfBreathsPerRound = new Map<number, number>();
    amountsOfBreathsPerRound.set(1, 15);
    amountsOfBreathsPerRound.set(1, 12);
    amountsOfBreathsPerRound.set(1, 10);

    const request = subject.makeSessionRequest(123, 2, false, retentionTimeMap, amountsOfBreathsPerRound, 'deine mudda');
    expect(request).toEqual(new SessionRequest(123, 2, false, retentionTimeMap, amountsOfBreathsPerRound, 'deine mudda'));
});