import React, { FunctionComponent, useState } from 'react';
import { RequestClient } from '../helpers/request';
import { Task } from '../interfaces/ITask';
import Form from './form';

interface TaskItemProps {
    id: number;
    name: string;
    description: string;
    priority: string;
    status: string;
    createdAt: string;
    updateTasks: (tasks: Task[]) => void;
}

const TaskItem: FunctionComponent<TaskItemProps> = ({ id, name, description, priority, status, createdAt, updateTasks }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const request = new RequestClient();

    const handleEditTask = () => {
        setIsEditing(!isEditing);

    }

    const handleDeleteTask = async (id: number) => {
        const tasks = await request.deleteTask(id);
        updateTasks(tasks);
    }

    const showButtons = () => {
        return isEditing ?
            <span className="task-btn" onClick={() => handleEditTask()}>Cancel</span> :
            <span className="task-btn" onClick={() => handleEditTask()}>Edit</span>;
    }

    const priorityColor = (): String => {
        let color = "";
        switch (priority.toLowerCase()) {
            case "low":
                color = "green";
                break;

            case "medium":
                color = "orange";
                break;

            case "high":
                color = "red";
                break;

            default:
                color = "";
        }

        return color;
    }

    return isEditing ? (
        <div className="form">
            <Form
                newTask={false}
                id={id}
                name={name}
                description={description}
                priority={priority}
                status={status}
                updateTasks={updateTasks}
                handleEditTask={handleEditTask}
            />
            {showButtons()}
        </div>
    ) : (
        <li className="list-item-wrap">
            <div className="list-item">
                <div className={`list-card-bg list-card-bg-${priorityColor()}`}></div>
                <div className={`list-card`}>
                    <h2>{name}</h2>
                    <div>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
            <div className=" list-card-details">
                <div>
                    <small>{priority}</small>
                    <small>{status}</small>
                    <small>{createdAt}</small>
                </div>
                <div>
                    <span className="task-btn" onClick={() => handleDeleteTask(id)}>Delete</span> /&nbsp; 
                    {showButtons()}
                </div>
            </div>
        </li>
    )
}

export default TaskItem;