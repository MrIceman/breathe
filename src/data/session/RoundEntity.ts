export class RoundEntity {
    constructor(public breathes, public retentionTime, public inhaleHoldDuration = 0, public totalTime = 0, public createdOn?) {
    }
}