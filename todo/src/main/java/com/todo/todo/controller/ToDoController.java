package com.todo.todo.controller;

import com.todo.todo.dto.request.RequestToDoDto;
import com.todo.todo.service.ToDoService;
import com.todo.todo.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/todo")
public class ToDoController {

    private final ToDoService toDoService;

    @Autowired
    public ToDoController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @PostMapping
    public ResponseEntity<StandardResponse> createToDo(@RequestBody RequestToDoDto toDoDto){
        return new ResponseEntity<>(new StandardResponse(201,"ToDo Created",toDoService.addToDo(toDoDto)), HttpStatus.CREATED);
    }

    @PutMapping(params = "id")
    public ResponseEntity<StandardResponse> updateToDo(
            @RequestParam long id,
            @RequestBody RequestToDoDto toDoDto
    )
    {
        try {
        return new ResponseEntity<>(new StandardResponse(201,"ToDo updated",toDoService.updateToDo(toDoDto,id)), HttpStatus.OK);

        }catch (RuntimeException e){
            if(e.getMessage().equals("ToDo not found")){
                return new ResponseEntity<>(new StandardResponse(404, e.getMessage(), null), HttpStatus.NOT_FOUND);
            }else if(e.getMessage().equals("not changes")) {
                return new ResponseEntity<>(new StandardResponse(304, e.getMessage(), null), HttpStatus.NOT_MODIFIED);
            }else{
                return new ResponseEntity<>(new StandardResponse(500, e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @DeleteMapping(params = "id")
    public ResponseEntity<StandardResponse> deleteToDo(@RequestParam long id){
        try {
            toDoService.deleteToDo(id);
            return new ResponseEntity<>(new StandardResponse(204,"ToDo deleted",null), HttpStatus.NO_CONTENT);
        }catch (RuntimeException e){
            if(e.getMessage().equals("ToDo not found")){
                return new ResponseEntity<>(new StandardResponse(404, e.getMessage(), null), HttpStatus.NOT_FOUND);
            }else{
                return new ResponseEntity<>(new StandardResponse(500, e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<StandardResponse> getToDo(@PathVariable long id){
        try {
        return new ResponseEntity<>(new StandardResponse(200,"ToDo found",toDoService.getToDo(id)), HttpStatus.OK);
        }catch (RuntimeException e){
            if(e.getMessage().equals("ToDo not found")){
                return new ResponseEntity<>(new StandardResponse(404, e.getMessage(), null), HttpStatus.NOT_FOUND);
            }else{
                return new ResponseEntity<>(new StandardResponse(500, e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @GetMapping("/list")
    public ResponseEntity<StandardResponse> getAllToDo(){
        return new ResponseEntity<>(new StandardResponse(200,"ToDo list",toDoService.getAllToDo()),HttpStatus.OK);
    }

}
