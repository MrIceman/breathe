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
                // updateState ui
                this.breathingComponent.updateState({...this.breathingComponent.getState(), sessionSaved: true});
            }, (_error) => {
                this.breathingComponent.updateState({...this.breathingComponent.getState(), sessionSaveFailed: true});
            });
    }

    public launchWithTrackingBreaths() {
        this.startSession();
        this.breathingComponent.updateState({...this.breathingComponent.getState(), start: true});
    }

    public launchWithoutTrackingBreaths() {
        this.startSession();
        this.breathingComponent.updateState({...this.breathingComponent.getState(), start: true});
    }


    public startSession() {
        this.amountOfBreaths = new Map();
        this.amountOfRounds = 0;
        this.retentionMap = new Map();
        this.notes = '';
    }


    public addRound(retentionTime: number, amountOfBreaths?: number) {
        this.amountOfRounds++;
        this.retentionMap.set(this.amountOfRounds, retentionTime);
        if (amountOfBreaths)
            this.amountOfBreaths.set(this.amountOfRounds, amountOfBreaths);
        const newResults = [...this.retentionMap.values()].map((number) => String(number));
        this.breathingComponent.updateState({...this.breathingComponent.getState(), results: newResults});
    }

    public removeLastRound() {
        this.retentionMap.delete(this.amountOfRounds);
        this.amountOfRounds--;
        const newResults = [...this.retentionMap.values()].map((number) => String(number));
        this.breathingComponent.updateState({...this.breathingComponent.getState(), results: newResults});
    }
}