import { IUser } from "../../interfaces/IUser";
import { FetchRequest } from "../requestService";

export class RequestService {

    private fetchRequest;

    constructor() {
        this.fetchRequest = new FetchRequest();
    }

    async get(url: string, method: string, headers: any): Promise<string> {
        const options: any = {};
        options.method = method;
        options.headers = headers;
        const req = await this.fetchRequest.send(url, options);

        return req;
    }

    async post(url: string, method: string, headers: any, body?: IUser): Promise<string | unknown> {
        const options: any = {};
        options.method = method;
        options.body = body ? JSON.stringify(body) : {};
        options.headers = headers;
        const req = await this.fetchRequest.send(url, options);

        return req;
    }
}