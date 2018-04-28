import {SessionManager} from "../../domain/session/SessionManager";
import {BreathingComponent} from "./BreathingComponent";

export class BreathingController {
    public amountOfRounds: number;
    public retentionMap: Map<number, number>;
    public amountOfBreaths: Map<number, number>;
    public notes: string;

    constructor(private readonly breathingComponent: BreathingComponent, private readonly sessionManager: SessionManager) {
    }

    public onSaveSession(amountOfRounds: number, custom: boolean, retentionTime: Map<number, number>, amountOfBreathsPerRetention: Map<number, number>
        , notes: string) {
        this.sessionManager.createAndSaveSession(amountOfRounds, custom, retentionTime, amountOfBreathsPerRetention, notes)
            .then((_result) => {
                // update ui
                this.breathingComponent.update();
            }, (_error) => {
                this.breathingComponent.update()
            });
    }

    public startSession() {
        this.amountOfRounds = 0;
        this.retentionMap = new Map();
        this.amountOfBreaths = new Map();
        this.notes = '';
    }

    public addRound(retentionTime: number, amountOfBreaths?: number) {
        this.amountOfRounds++;
        this.retentionMap.set(this.amountOfRounds, retentionTime);
        if (amountOfBreaths)
            this.amountOfBreaths.set(this.amountOfRounds, amountOfBreaths);
    }
}