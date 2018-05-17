import {HttpRequest} from "../../data/HttpRequest";

export class ColdSessionRequest extends HttpRequest {

    constructor(public readonly uuid: string,
                public readonly duration: number,
                public readonly notes: string,
                public readonly type: string,
                public readonly httpEndpoint: string = 'cold/create',
                public readonly httpMethod: string = 'POST') {
        super(httpEndpoint, httpMethod, {
            uuid,
            duration,
            notes,
            type
        });
    }

    static empty(): ColdSessionRequest {
        // Use the empty construct if you would like to parse an Entity from JSON
        return new ColdSessionRequest(undefined, undefined, undefined, undefined);
    }

    toJSONString(): string {
        return JSON.stringify(this);
    }

    fromJSONString(json: string): ColdSessionRequest {
        return JSON.parse(json);
    }

}