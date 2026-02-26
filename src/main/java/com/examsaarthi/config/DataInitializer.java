package com.examsaarthi.config;

import com.examsaarthi.model.Course;
import com.examsaarthi.repository.CourseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedCourses(CourseRepository courseRepository) {
        return args -> {
            if (courseRepository.count() == 0) {
                courseRepository.saveAll(List.of(
                        new Course("BCA Previous Year Papers", "igu-bca", "IGU", "Semester-wise BCA question papers with downloadable sets.", "/courses/igu-bca"),
                        new Course("B.Tech Previous Year Papers", "igu-btech", "IGU", "Core branch papers and practice archives for all semesters.", "/courses/igu-btech"),
                        new Course("B.Com Previous Year Papers", "igu-bcom", "IGU", "Commerce stream solved and unsolved papers.", "/courses/igu-bcom"),
                        new Course("BBA Previous Year Papers", "igu-bba", "IGU", "Management papers across semesters.", "/courses/igu-bba")
                ));
            }
        };
    }
}
