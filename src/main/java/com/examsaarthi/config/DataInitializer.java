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
                        new Course("BCA Previous Year Papers", "igu-bca", "IGU", "Semester-wise BCA question papers.", "/igu-bca.html"),
                        new Course("B.Tech Previous Year Papers", "igu-btech", "IGU", "Core branch papers and sample sets.", "/igu-btech.html"),
                        new Course("B.Com Previous Year Papers", "igu-bcom", "IGU", "Commerce stream solved and unsolved papers.", "/igu-bcom.html")
                ));
            }
        };
    }
}
