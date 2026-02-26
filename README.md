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

## Deployment note (important)
This project is a long-running Spring Boot server. Deploying it directly as a static Vercel site can produce `404 NOT_FOUND` because Vercel expects static assets or serverless functions, not a persistent Java web server.

Recommended platforms for this app:
- Render
- Railway
- Fly.io
- Any VPS/Docker host

If you still use Vercel in front of this app, point Vercel routes to the actual running backend URL.

## Production URL
- Primary domain: `https://examsaarthi.com`
- Configure DNS `A/AAAA` or `CNAME` to your hosting provider and map this domain in provider dashboard.
- Keep HTTPS enabled and force redirect from `www` to apex (or vice-versa) consistently.
