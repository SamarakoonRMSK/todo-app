package com.todo.todo.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RequestToDoDto {
    private String description;
    private boolean done;
}
