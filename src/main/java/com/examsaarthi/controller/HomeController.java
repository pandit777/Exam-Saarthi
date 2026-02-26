package com.examsaarthi.controller;

import com.examsaarthi.repository.CourseRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    private final CourseRepository courseRepository;

    public HomeController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("courses", courseRepository.findAll());
        return "index";
    }

    @GetMapping("/api/courses")
    @ResponseBody
    public Object getCourses() {
        return courseRepository.findAll();
    }
}
