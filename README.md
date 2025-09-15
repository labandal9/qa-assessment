# QA Assessment – Full-Stack App

## 📌 Project Description
This QA project is based on a cloned GitHub repository:
[Original GitHub Project Link](https://github.com/fastapi/full-stack-fastapi-template)

The application includes:
- Backend (Dockerized API + Swagger)
- Frontend (React, running on http://localhost:5174)
- Database (Postgres)

I selected this project because it provides a real-world full-stack environment
with authentication, CRUD operations, and Docker-based deployment, which are ideal
for QA testing.

## ⚙️ Test Environment

- Docker & Docker Compose → to run backend API and database

- Node.js 18+ → to run the React frontend and Cypress tests

- Cypress → for end-to-end test automation

---

## 🚀 How to Run Tests
Clone the repository
- git clone https://github.com/fastapi/full-stack-fastapi-template
- cd <your-repo-folder>

- Install dependencies 
  - npm install
- Start the application 
  - Run the frontend locally 
    - Run the backend and database using Docker: 
      - docker-compose up --build
- Run Cypress tests 
  - Interactive mode (using chrome)
    - npx cypress open
  - Headless mode:
    - npx cypress run
- Run the following files: (Path: QA-Assessment -> Automation -> cypress -> e2e)
  - userRegistration.spec.cy
  - userLogin.cy
  - userPasswordRecovery.cy


📌 Assumptions and Modifications:

- Automated tests cover critical user flows:

    - User Registration / Sign-up
    
    - User Login / Authentication
    
    - Password Recovery

- Both positive and negative scenarios are implemented.

- Some frontend issues were discovered:

    - Wrong error messages for invalid email or empty fields
    
    - Username field used instead of email in some places

- Tests use Cypress with TypeScript and API calls to create users before tests.

- Assumption: Admin credentials are available in .env or via Cypress.env() to create users via API.
