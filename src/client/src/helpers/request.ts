import { Task } from "../interfaces/ITask";
import cookies from "./cookieParser";
import { RequestService } from "./requestService";

export class RequestClient {
    private baseUrl = `/api/v1/tasks`;
    private headers = {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': cookies()
    }
    private requestService;

    constructor() {
        this.requestService = new RequestService();
    }

    async getAllTasks(): Promise<Task[]> {
        return this.requestService.get(
            this.baseUrl, 
            "GET", 
            this.headers
        );
    }

    async createTask(task: Task): Promise<Task[]> {
        return this.requestService.post(
            this.baseUrl, 
            "POST", 
            this.headers,
            task
        );
    }

    async deleteTask(taskId: number): Promise<Task[]> {
        return this.requestService.delete(
            this.baseUrl, 
            "DELETE", 
            this.headers,
            taskId
        );
    }

    async updateTask(id: number, task: Task): Promise<Task[]> {
        return this.requestService.update(
            `${this.baseUrl}/update/${id}`, 
            "PUT", 
            this.headers,
            task
        );
    }

    async filterByStatus(filterBy: string): Promise<Task[]> {
        return this.requestService.get(
            `${this.baseUrl}/filter/status?status=${filterBy}`, 
            "GET", 
            this.headers
        );
    }

    async filterByPriority(filterBy: string): Promise<Task[]> {
        return this.requestService.get(
            `${this.baseUrl}/filter/priority?priority=${filterBy}`, 
            "GET", 
            this.headers
        );
    }
}
