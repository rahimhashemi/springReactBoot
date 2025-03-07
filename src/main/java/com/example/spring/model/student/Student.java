package com.example.spring.model.student;

import lombok.*;

@ToString
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Student {
    private Long id;
    private String name;
    private String email;
    private Gender gender;
}
