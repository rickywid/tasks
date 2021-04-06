import React, { useContext, useEffect, useState } from 'react';
import { Task } from "../interfaces/ITask";
import { RequestClient } from '../helpers/request';
import TaskItem from '../components/taskItem';
import Form from '../components/form';
import { UserContext } from '../context/userContext';
import Login from './login';
import Register from './register';
import { RequestClientAuth } from '../helpers/auth/request';

function Main() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [prioritySelected, setPriority] = useState<string>("");
    const [statusSelected, setStatus] = useState<string>("");
    const [showLogin, setShowLogin] = useState<boolean>(true);
    const request = new RequestClient();
    const requestAuth = new RequestClientAuth();
    //@ts-ignore
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        const fetchRequest = async () => {
            const tasks = await request.getAllTasks();
            setTasks(tasks);
        }

        fetchRequest();
    }, []);

    const renderTasks = (task: Task, i: number) => {
        return <TaskItem
            key={i}
            id={task.id as number}
            name={task.name}
            description={task.description}
            priority={task.priority}
            status={task.status}
            createdAt={task.createdAt as string}
            updateTasks={updateTasks}
        />
    }

    const updateTasks = (tasks: Task[]) => {
        setTasks(tasks);
    }

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority("");
        setStatus(e.target.value);

        if (!e.target.value) {
            const tasks = await request.getAllTasks();
            setTasks(tasks);
            return;
        }

        const tasks = await request.filterByStatus(e.target.value);
        updateTasks(tasks);
    }

    const handlePriorityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus("");
        setPriority(e.target.value);

        if (!e.target.value) {
            const tasks = await request.getAllTasks();
            setTasks(tasks);
            return;
        }

        const tasks = await request.filterByPriority(e.target.value);
        updateTasks(tasks);
    }

    const toggleShowLogin = (val: boolean) => {
        setShowLogin(val);
    }

    const showLoginForm = () => {
        if (showLogin) {
            return <Login
                toggleShowLogin={toggleShowLogin}
            />
        } else {
            return <Register
                toggleShowLogin={toggleShowLogin}
            />
        }
    }

    const handleLogout = async () => {
        await requestAuth.logout();
        setUser({ authenticated: false })
    }


    const userAuthenticated = !user.authenticated ?
        showLoginForm() :
        (
            <div className="form">
                <Form
                    newTask={true}
                    updateTasks={updateTasks}
                />
            </div>
        );

    const displayLogoutBtn = user.authenticated && (
        <>
            <span>Hello {user.authenticated}&nbsp;</span>
            <button onClick={handleLogout}>Logout</button>
        </>
    )

    const taskItems = tasks.length ? <ul>{tasks.map((task, i) => renderTasks(task, i))}</ul> : (
        <div className="no-tasks">
            <p>There are currently no tasks</p>
        </div>
    );

    return (
        <div className="App">
            <div className="container">
                <div className="col-left">
                    <div>
                        <h1>JAVA + REACT</h1>
                    </div>
                    <div className="filters">
                        <div>
                            <span>Count: {tasks.length}</span>
                        </div>
                        <div>
                            <label htmlFor="priority">Priority </label>
                            <select
                                name="priority"
                                id="priority"
                                onChange={(e) => handlePriorityChange(e)}
                                value={prioritySelected}
                            >
                                <option value=""></option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="status">Status </label>
                            <select
                                name="status"
                                id="status"
                                onChange={(e) => handleStatusChange(e)}
                                value={statusSelected}
                            >
                                <option value=""></option>
                                <option value="Incomplete">Incomplete</option>
                                <option value="Active">Active</option>
                                <option value="Complete">Complete</option>
                            </select>
                        </div>
                    </div>
                    {taskItems}
                </div>
                <div className="col-right">
                    {displayLogoutBtn}
                    {userAuthenticated}
                </div>
            </div>
        </div>
    );
}

export default Main;
