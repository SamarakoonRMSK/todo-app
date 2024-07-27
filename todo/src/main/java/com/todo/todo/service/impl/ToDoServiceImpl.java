package com.todo.todo.service.impl;

import com.todo.todo.dto.request.RequestToDoDto;
import com.todo.todo.dto.response.ResponseToDoDto;
import com.todo.todo.entity.ToDo;
import com.todo.todo.exception.EntryNotFoundException;
import com.todo.todo.exception.NoChangesMadeException;
import com.todo.todo.repo.ToDoRepo;
import com.todo.todo.service.ToDoService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ToDoServiceImpl implements ToDoService {

    private final ToDoRepo toDoRepo;

    @Autowired
    public ToDoServiceImpl(ToDoRepo toDoRepo) {
        this.toDoRepo = toDoRepo;
    }

    @Override
    public ResponseToDoDto addToDo(RequestToDoDto dto) {
        ToDo toDo = new ToDo();
        toDo.setDescription(dto.getDescription());
        toDo.setDone(dto.isDone());
        toDoRepo.save(toDo);
        return new ResponseToDoDto(
                toDo.getId(),
                toDo.getDescription(),
                toDo.isDone()
        );
    }

    @Override
    public ResponseToDoDto updateToDo(RequestToDoDto dto, long id) {
        Optional<ToDo> selectedToDo = toDoRepo.findById(id);
        if(selectedToDo.isEmpty()){
            throw new EntryNotFoundException("ToDo not found");
        }
        if(dto.getDescription() == null && dto.isDone() == selectedToDo.get().isDone()){
            throw new NoChangesMadeException("not changes");
        }
        if(dto.getDescription() != null) {
            selectedToDo.get().setDescription(dto.getDescription());
        }
        if(dto.isDone() != selectedToDo.get().isDone()) {
            selectedToDo.get().setDone(dto.isDone());
        }
        toDoRepo.save(selectedToDo.get());
        return new ResponseToDoDto(
                selectedToDo.get().getId(),
                selectedToDo.get().getDescription(),
                selectedToDo.get().isDone()
        );
    }

    @Override
    public ResponseToDoDto getToDo(long id) {
        Optional<ToDo> selectedToDo = toDoRepo.findById(id);
        if(selectedToDo.isPresent()){
            return new ResponseToDoDto(
                    selectedToDo.get().getId(),
                    selectedToDo.get().getDescription(),
                    selectedToDo.get().isDone()
            );
        }
        throw new EntryNotFoundException("ToDo not found");

    }

    @Override
    public void deleteToDo(long id) {
        Optional<ToDo> selectedToDo = toDoRepo.findById(id);
        if(selectedToDo.isPresent()){
            toDoRepo.deleteById(id);
            return;
        }
            throw new EntryNotFoundException("ToDo not found");

    }

    @Override
    public List<ResponseToDoDto> getAllToDo() {
        List<ResponseToDoDto> list = new ArrayList<>();
        toDoRepo.findAll().forEach(toDo -> list.add(new ResponseToDoDto(toDo.getId(), toDo.getDescription(), toDo.isDone())));
        return list;
    }
}
