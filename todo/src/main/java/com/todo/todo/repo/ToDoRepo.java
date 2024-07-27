package com.todo.todo.repo;

import com.todo.todo.entity.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Optional;

@EnableJpaRepositories
public interface ToDoRepo extends JpaRepository<ToDo, Long> {
    public Optional<ToDo> findById(long id);
}
