# Exam-Saarthi (Java + Backend)

Exam Saarthi is now fully Java/Spring Boot based. Legacy root-level static HTML pages have been removed, and content is served through backend controllers + Thymeleaf templates.

## Features
- Server-rendered pages using Thymeleaf
- Backend course data (JPA + H2 in-memory DB)
- API endpoint: `GET /api/courses`
- Dynamic course pages: `GET /courses/{slug}`
- User Sign Up and Sign In using Spring Security

## Run locally
```bash
mvn spring-boot:run
```

Open:
- Home: `http://localhost:8080/`
- Sign in: `http://localhost:8080/signin`
- Sign up: `http://localhost:8080/signup`
