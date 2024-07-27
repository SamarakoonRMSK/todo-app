package com.todo.todo.service;

import com.todo.todo.dto.request.RequestToDoDto;
import com.todo.todo.dto.response.ResponseToDoDto;

import java.util.List;

public interface ToDoService {
    public ResponseToDoDto addToDo(RequestToDoDto dto);

    public ResponseToDoDto updateToDo(RequestToDoDto dto,long id);
    public ResponseToDoDto getToDo(long id);
    public void deleteToDo(long id);
    public List<ResponseToDoDto> getAllToDo();
}
