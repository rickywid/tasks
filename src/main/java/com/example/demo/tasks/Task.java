package com.example.demo.tasks;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
public class Task {

    @Id
    @SequenceGenerator(name="task_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;
    @Column(nullable = false)
    String name;
    @Column(nullable = false, length = 250)
    String description;
    @Enumerated(value = EnumType.STRING)
    TaskStatus status = TaskStatus.Incomplete;
    @Enumerated(value = EnumType.STRING)
    TaskPriority priority = TaskPriority.Low;
    @Column(nullable = false)
    LocalDate createdAt = LocalDate.now();

    public Task() {
    }

    public Task(String name, String description, TaskPriority priority, TaskStatus status) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "taskRepository{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", completed=" + status +
                ", priority=" + priority +
                ", createdAt=" + createdAt +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task that = (Task) o;
        return id.equals(that.id) && name.equals(that.name) && status.equals(that.status) && priority == that.priority && createdAt.equals(that.createdAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, status, priority, createdAt);
    }
}
