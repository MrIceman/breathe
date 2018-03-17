import {Response} from "../../model/response/Response";
import {ActionType} from "./ActionType";

export interface Receiver<T extends Response> {
    receive(actionType: ActionType, response: T): void;
}

/**
 * The Dispatchers responsibility is to receive Actions and delegate them
 * to the registered callbacks.
 * The datastructure used is a Map where the keys are the Action types and the value
 * is an Array of Receivers.
 */
export class Dispatcher {
    private static instance: Dispatcher;
    receiverList: Array<Receiver<Response>>;

    static getInstance(): Dispatcher {
        if (this.instance == null) {
            this.instance = new Dispatcher();
        }

        return this.instance;
    }

    registerReceiver(receiver: Receiver<Response>) {
        let receiverList: Array<Receiver<Response>> = this.receiverList;
        if (receiverList !== undefined && receiverList.indexOf(receiver) === -1) {
            receiverList.push(receiver);
        }
    }

    unregisterReceiver(receiver: Receiver<Response>) {
        let receiverList: Array<Receiver<Response>> = this.receiverList;
        if (receiverList !== undefined && receiverList.indexOf(receiver) !== -1) {
            receiverList.splice(receiverList.indexOf(receiver), 1);
        }
    }

    dispatch(actionType: ActionType, response?: Response) {
        let receiverList: Array<Receiver<Response>> = this.receiverList;
        if (receiverList !== undefined) {
            for (let i = 0; i < receiverList.length; i++) {
                receiverList[i].receive(actionType, response);
            }
        }
    }

    private constructor() {
        this.receiverList = [];
    }

}