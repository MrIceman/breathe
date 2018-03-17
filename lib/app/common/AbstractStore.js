import { Dispatcher } from "./Dispatcher";
export class AbstractStore {
    constructor(component) {
        this.component = component;
        this.registerToDispatcher();
    }
    registerToDispatcher() {
        Dispatcher.getInstance().registerReceiver(this);
    }
    ;
    unregisterFromDispatcher() {
        Dispatcher.getInstance().unregisterReceiver(this);
    }
    ;
    updateState() {
        this.component.setState(this.state);
    }
}
//# sourceMappingURL=AbstractStore.js.map