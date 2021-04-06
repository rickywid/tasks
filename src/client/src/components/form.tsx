import React, { FunctionComponent, useState } from 'react';
import Spinner from "./spinner";
import { RequestClient } from '../helpers/request';
import Truncate from '../helpers/truncate';
import { Task } from '../interfaces/ITask';

interface FormProps {
    newTask: boolean;
    id?: number;
    name?: string;
    description?: string;
    status?: string;
    priority?: string;
    updateTasks: (tasks: Task[]) => void;
    handleEditTask?: () => void;
}

const Form: FunctionComponent<FormProps> = ({ updateTasks, newTask, id, name, description, status, priority, handleEditTask }) => {
    const maxLength = 150;
    const [prioritySelected, setPriority] = useState<string>(priority as string || "Low");
    const [statusSelected, setStatus] = useState<string>(status as string || "Incomplete");
    const [taskName, setTaskName] = useState<string>(name as string);
    const [taskDescription, setTaskDescription] = useState<string>(description as string || "");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const request = new RequestClient();
    const truncate = new Truncate(maxLength);

    const handlePriorityChange = (priority: string) => {
        setPriority(priority);
    }

    const handleStatusChange = (status: string) => {
        setStatus(status);
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setTaskName(name);
    }

    const handleDescriptionChange = (e: any) => {
        const description = e.target.value;
        setTaskDescription(truncate.cut(description));
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        let res;

        const body = {
            name: taskName,
            description: taskDescription,
            priority: prioritySelected,
            status: statusSelected
        }

        if (newTask) {
            try {
                res = await request.createTask(body);
                updateTasks(res);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        } else {
            await request.updateTask(id as number, body);
            const tasks = await request.getAllTasks();
            updateTasks(tasks);

            if (handleEditTask) {
                handleEditTask();
            }
        }
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <h4>{newTask ? 'Add Task' : 'Edit Task'}</h4>
            <div>
                <label htmlFor="name"><strong>Name</strong></label>
            </div>
            <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => handleNameChange(e)}
                defaultValue={!newTask ? name : ""}
                required
            />
        </div>
        <div>
            <div>
                <label htmlFor="description"><strong>Description</strong></label>
            </div>
            <textarea
                cols={20}
                rows={5}
                id="description"
                name="description"
                onChange={(e) => handleDescriptionChange(e)}
                value={taskDescription}
                required
            />
            <p className="length-indicator">{taskDescription.length}/{maxLength}</p>
        </div>
        <div className="form-group-inline">
            <div className="form-task-priority">
                <div>
                    <p><strong>Priority</strong></p>
                </div>
                <label htmlFor="low">Low</label>
                <input
                    type="radio"
                    id="low"
                    name="priority"
                    value="Low"
                    onChange={() => handlePriorityChange("Low")}
                    checked={prioritySelected === "Low"}
                />
                <label htmlFor="medium">Medium</label>
                <input
                    type="radio"
                    id="medium"
                    name="priority"
                    value="Medium"
                    onChange={() => handlePriorityChange("Medium")}
                    checked={prioritySelected === "Medium"}
                />
                <label htmlFor="high">High</label>
                <input
                    type="radio"
                    id="high"
                    name="priority"
                    value="High"
                    onChange={() => handlePriorityChange("High")}
                    checked={prioritySelected === "High"}
                />
            </div>
            <div className="form-task-status">
                <div>
                    <p><strong>Status</strong> </p>
                </div>
                <label htmlFor="incomplete">Incomplete</label>
                <input
                    type="radio"
                    id="incomplete"
                    name="status"
                    value="Incomplete"
                    onChange={() => handleStatusChange("Incomplete")}
                    checked={statusSelected === "Incomplete"}
                />
                <label htmlFor="active">Active </label>
                <input
                    type="radio"
                    id="active"
                    name="status"
                    value="Active"
                    onChange={() => handleStatusChange("Active")}
                    checked={statusSelected === "Active"}
                />
                <label htmlFor="complete">Complete</label>
                <input
                    type="radio"
                    id="complete"
                    name="status"
                    value="Complete"
                    onChange={() => handleStatusChange("Complete")}
                    checked={statusSelected === "Complete"}
                />
            </div>
        </div>
        <div>
            <input type="submit" value={newTask ? "Submit" : "Save"} disabled={isLoading} />
            {isLoading && <Spinner />}
        </div>
    </form>
}

export default Form;