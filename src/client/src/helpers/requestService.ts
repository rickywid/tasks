import { Task } from "../interfaces/ITask";

export class FetchRequest {
    private host = "http://localhost:3000";
    // private host = "https://limitless-dawn-95744.herokuapp.com/";
    
    async send(url: string, options: any) {
        try {
            const res: Response = await fetch(url, options);
            let data;

            if(!res.ok) {
                if(res.url === `${this.host}/login`) {
                    throw new Error("Incorrect username or password.");
                }
    
                if(res.url === `${this.host}/register`) {
                    throw new Error("Username already taken.");
                }
            } 
    
            if(res.url === `${this.host}/logout`) {
                return data;
            }
    
            if(res.headers.get("content-type") === "text/plain;charset=UTF-8") {
                data = await res.text();
            } else {
                data = await res.json();
            }
            
            return data;
        } catch(e) {
            throw new Error(e.message);
        }
    }
}

export class RequestService {
    private fetchRequest;

    constructor() {
        this.fetchRequest = new FetchRequest();
    }

    async get(url: string, method: string, headers: any): Promise<Task[]> {
        const options: any = {};
        options.method = method;
        options.headers = headers;
        const req = await this.fetchRequest.send(url, options);

        return req;
    }

    async post(url: string, method: string, headers: any, body: Task): Promise<Task[]> {
        const options: any = {};
        options.method = method;
        options.body = JSON.stringify(body);
        options.headers = headers;
        const req = await this.fetchRequest.send(url, options);

        return req;
    }

    async delete(url: string, method: string, headers: any, taskId: number): Promise<Task[]> {
        const options: any = {};
        options.method = method;
        options.headers = headers;
        const req = await this.fetchRequest.send(`${url}/delete/${taskId}`, options);

        return req;
    }

    async update(url: string, method: string, headers: any, body: Task): Promise<Task[]> {
        const options: any = {};
        options.method = method;
        options.body = JSON.stringify(body);
        options.headers = headers;
        const req = await this.fetchRequest.send(url, options);

        return req;
    }
}