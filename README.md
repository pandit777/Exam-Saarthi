# Exam-Saarthi (Java + Backend)

Exam Saarthi is now a Spring Boot based application that serves course/question-paper data from backend APIs and includes user authentication.

## Features
- Server-rendered pages using Thymeleaf
- Backend course data (JPA + H2 in-memory DB)
- API endpoint: `GET /api/courses`
- User Sign Up and Sign In using Spring Security

## Run locally
```bash
mvn spring-boot:run
```

Open:
- Home: `http://localhost:8080/`
- Sign in: `http://localhost:8080/signin`
- Sign up: `http://localhost:8080/signup`
