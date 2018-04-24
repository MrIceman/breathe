import {SessionManager} from "../../domain/session/SessionManager";
import {BreathingComponent} from "./BreathingComponent";

export class BreathingController {

    constructor(private readonly breathingComponent: BreathingComponent, private readonly sessionManager: SessionManager) {
    }

    public onSaveSession(amountOfRounds: number, custom: boolean, retentionTime: Map<number, number>, amountOfBreathsPerRetention: Map<number, number>
        , notes: string) {
        this.sessionManager.createAndSaveSession(amountOfRounds, custom, retentionTime, amountOfBreathsPerRetention, notes)
            .then((_result) => {
                // update ui
                this.breathingComponent.props = {};
            });
    }

    public startSession() {

    }
}