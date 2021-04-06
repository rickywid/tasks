import { IUser } from "../../interfaces/IUser";
import cookies from "../cookieParser";
import { RequestService } from "./requestService";

export class RequestClientAuth {
    private baseUrl = process.env.REACT_APP_URL;
    private headers: any = {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': cookies(),
        'X-Requested-With': 'XMLHttpRequest'
    }

    private requestService;

    constructor() {
        this.requestService = new RequestService();
    }

    async register(user: IUser): Promise<string | unknown> {
        return this.requestService.post(
            `/register`, 
            "POST", 
            this.headers,
            user
        );
    }

    async login(username: string, password: string): Promise<string> {
        this.headers = {
            ...this.headers, 
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        }

        return this.requestService.get(
            `/login`, 
            "GET", 
            this.headers
        );
    }

    async logout(): Promise<String | unknown> {
        return this.requestService.post(
            `/logout`, 
            "POST", 
            this.headers
        );
    }
}

