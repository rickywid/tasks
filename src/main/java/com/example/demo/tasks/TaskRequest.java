package com.example.demo.tasks;

public class TaskRequest {
    private String name;
    private String description;
    private TaskPriority priority;
    private TaskStatus status;

    public TaskRequest(String name, String description, String priority, String status) {
        this.name = name;
        this.description = description;
        this.priority = TaskPriority.valueOf(priority);
        this.status = TaskStatus.valueOf(status);
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }


    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "TaskRequest{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", priority=" + priority +
                ", status=" + status +
                '}';
    }
}
