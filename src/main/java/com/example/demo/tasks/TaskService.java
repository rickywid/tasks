package com.example.demo.tasks;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> findAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> createTask(TaskRequest request) {
        taskRepository.save(new Task(
                request.getName(),
                request.getDescription(),
                request.getPriority(),
                request.getStatus()
        ));
        return findAllTasks();
    }

    public void updateTask(Long id, TaskRequest task) {
        Task t = taskRepository.findById(id).orElseThrow(() -> new IllegalStateException("Task not found"));
        taskRepository.updateTask(
                t.getId(),
                task.getName(),
                task.getDescription(),
                String.valueOf(task.getStatus()),
                String.valueOf(task.getPriority())
        );
    }

    public List<Task> deleteTask(Long id) {
        taskRepository.deleteById(id);
        return findAllTasks();
    }

    public List<Task> findAllTasksByStatus(String status) {
        return taskRepository.findAllByStatus(status);
    }

    public List<Task> findAllTasksByPriority(String priority) {
        return taskRepository.findAllByPriority(priority);
    }
}
