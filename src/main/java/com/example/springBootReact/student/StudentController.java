package com.example.springBootReact.student;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "api/students")
public class StudentController {

    @GetMapping
    public List<Student> getAllStudents() {
        System.out.println("StudentController.getAllStudents " + new Timestamp(new Date().getTime()));
        return Arrays.asList(
                new Student(1L, "Rahim", "hashemi@gmail.com", Gender.MALE),
                new Student(2L, "Majid", "majid@gmail.com", Gender.MALE)
        );
    }
}
