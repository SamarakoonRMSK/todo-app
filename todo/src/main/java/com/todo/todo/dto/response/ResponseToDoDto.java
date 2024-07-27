package com.todo.todo.dto.response;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseToDoDto {

    private long id;
    private String description;
    private boolean done;
}
