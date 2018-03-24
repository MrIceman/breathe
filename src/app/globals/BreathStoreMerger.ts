import {GlobalStore, Store} from "./BreathStore";

export class BreathStoreMerger {
    constructor(private store: GlobalStore) {
    }

    merge(data: Store) {
        this.store.refresh({...this.store.getStore(), ...data});
    }
}