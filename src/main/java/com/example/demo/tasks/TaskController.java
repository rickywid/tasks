package com.example.demo.tasks;

import com.example.demo.tasks.*;

import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/tasks")
public class TaskController {

    private TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.findAllTasks();
    }

    @GetMapping(path = "/filter/status")
    public List<Task> getAllTasksByStatus(@RequestParam String status) {
        return taskService.findAllTasksByStatus(status);
    }

    @GetMapping(path = "/filter/priority")
    public List<Task> getAllTasksByPriority(@RequestParam String priority) {
        return taskService.findAllTasksByPriority(priority);
    }

    @PostMapping
    public List<Task> createTask(@RequestBody TaskRequest request) {
        return taskService.createTask(request);
    }

    @PutMapping(path = "/update/{id}")
    public String updateTask(@PathVariable("id") Long id, @RequestBody TaskRequest task) {
        taskService.updateTask(id, task);
        return "Updated";
    }

    @DeleteMapping(path = "/delete/{id}")
    public List<Task> deleteTask(@PathVariable("id") Long id) {
        return taskService.deleteTask(id);
    }
}
