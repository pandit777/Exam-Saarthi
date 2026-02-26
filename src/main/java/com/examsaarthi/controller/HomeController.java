package com.examsaarthi.controller;

import com.examsaarthi.model.Course;
import com.examsaarthi.repository.CourseRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ResponseStatusException;

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

    @GetMapping("/courses/{slug}")
    public String courseDetail(@PathVariable String slug, Model model) {
        Course course = courseRepository.findBySlug(slug)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));
        model.addAttribute("course", course);
        return "course-detail";
    }

    @GetMapping("/api/courses")
    @ResponseBody
    public Object getCourses() {
        return courseRepository.findAll();
    }
}
