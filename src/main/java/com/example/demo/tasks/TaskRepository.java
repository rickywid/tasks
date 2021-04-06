package com.example.demo.tasks;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Transactional
    @Modifying
    @Query(value = "UPDATE Task " +
            "SET name = ?2, " +
            "description = ?3, " +
            "status = ?4, " +
            "priority = ?5 " +
            "WHERE id = ?1", nativeQuery = true)
    int updateTask(Long id, String name, String description, String status, String priority);

    @Query(value = "SELECT * FROM Task " +
            "WHERE status = ?1", nativeQuery = true)
    List<Task> findAllByStatus(String status);


    @Query(value = "SELECT * FROM Task " +
            "WHERE priority = ?1", nativeQuery = true)
    List<Task> findAllByPriority(String priority);

}