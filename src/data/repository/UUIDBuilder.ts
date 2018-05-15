import {DeviceManager} from "../../utils/DeviceManager";

const uuid = require('react-native-uuid');

export class UUIDBuilder {
    constructor(private readonly deviceManager: DeviceManager) {
    }

    public buildUUID(): string {
        return uuid.v1();
    }
}
