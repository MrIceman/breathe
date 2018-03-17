/**
 * The Dispatchers responsibility is to receive Actions and delegate them
 * to the registered callbacks.
 * The datastructure used is a Map where the keys are the Action types and the value
 * is an Array of Receivers.
 */
export class Dispatcher {
    static getInstance() {
        if (this.instance == null) {
            this.instance = new Dispatcher();
        }
        return this.instance;
    }
    registerReceiver(receiver) {
        let receiverList = this.receiverList;
        if (receiverList !== undefined && receiverList.indexOf(receiver) === -1) {
            receiverList.push(receiver);
        }
    }
    unregisterReceiver(receiver) {
        let receiverList = this.receiverList;
        if (receiverList !== undefined && receiverList.indexOf(receiver) !== -1) {
            receiverList.splice(receiverList.indexOf(receiver), 1);
        }
    }
    dispatch(actionType, response) {
        let receiverList = this.receiverList;
        if (receiverList !== undefined) {
            for (let i = 0; i < receiverList.length; i++) {
                receiverList[i].receive(actionType, response);
            }
        }
    }
    constructor() {
        this.receiverList = [];
    }
}
//# sourceMappingURL=Dispatcher.js.map