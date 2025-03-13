
# Fitness App Project

## Project Overview

This full-stack fitness application is designed to help users manage their fitness journey by registering, logging in, and recording workout logs. The application is built using Node.js, Express, MongoDB, and React, with additional features including:

- User Management: Secure registration, login, logout, and session handling.
- Workout Logging: Full CRUD (Create, Read, Update, Delete) operations for workout logs, with each log associated with a user via sessions.
- Server-Side Validation: Input validation is implemented using express-validator to ensure data integrity and provide clear error messages.
- Cookie & Session Handling: Managed via express-session and cookie-parser to maintain state across requests.
- Templating: Basic server-side templating (EJS) is used for a dashboard demonstration.
- Deployment: The backend has been containerized using Docker and prepared for deployment on Render, with instructions to deploy both the backend and the static React front end.
- Front-End Features: The React application includes multiple routes (Home, Login, Register, LogWorkouts, MyLogs) along with a cookie consent banner on the Home page to meet compliance requirements.

## Detailed Work Completed

### 1. User Management
- Implemented a secure registration system that verifies unique email addresses.
- Developed a login system that validates credentials and stores user data in server sessions.
- Configured sessions and cookies using express-session and cookie-parser to maintain user login state.
- Added logout functionality to properly destroy sessions and clear cookies.

### 2. Workout Logging
- Designed and implemented RESTful API endpoints for creating, reading, updating, and deleting workout logs.
- Built a Mongoose model for workout logs that associates each log with a specific user ID, ensuring that each user's logs are kept separate.
- Created React components (LogWorkouts and MyLogs) that interact with the backend API for persistent storage and retrieval of workout data.
- Implemented error handling and user feedback for all CRUD operations on workout logs.

### 3. Server-Side Validation
- Integrated express-validator into the registration and login routes to validate input data such as username, email, and password.
- Configured custom error messages that clearly inform the user of any input issues (e.g., invalid email format, password too short).
- Ensured that server-side validation errors are passed back to the client for display within the React UI.

### 4. Cookie & Session Handling
- Set up express-session along with cookie-parser to manage user sessions and persist login state via cookies.
- Configured CORS to allow cross-origin requests from the React development server (http://localhost:5173) with credentials enabled.
- Ensured that React components use fetch with `credentials: "include"` to send the session cookie to the server.
- Developed a cookie consent banner on the Home page that prompts users to accept cookies, storing their consent in localStorage so that it isn’t repeatedly shown.

### 5. Front-End Implementation
- Developed a React-based front end with routing (using React Router) for different pages including Home, Login, Register, LogWorkouts, and MyLogs.
- Implemented user-friendly error messages and form handling for both login and registration.
- Designed interactive components such as a testimonial carousel and a cookie consent banner to enhance user experience.
- Ensured that the front end integrates seamlessly with the backend API for all authentication and workout logging operations.

### 6. Deployment Preparation
- Containerized the backend using a Dockerfile for deployment.
- Prepared environment configurations for connecting to MongoDB Atlas and managing session secrets.
- Set up deployment instructions for Render, including steps for deploying both the Node/Express backend and the static React front end.
- Documented the deployment process and ensured that the deployed application allows anyone to register, log in, and persist workout logs in the database.

## Team Contributions

The workload for this iteration was evenly divided among the four team members as follows:

- Samuel Simeon
  - Focused on implementing the user registration and login functionalities.
  - Set up server-side session and cookie handling using express-session and cookie-parser.
  - Integrated express-validator for authentication routes to ensure secure input handling.

- Faarouq Asaju
  - Developed the RESTful API endpoints for workout logging (CRUD operations).
  - Built the Mongoose model for workout logs and associated logs with user sessions.
  - Implemented server-side validation for workout log inputs and error handling.

- Saviour Akpan
  - Designed and developed the React front end, including routing for Home, Login, Register, LogWorkouts, and MyLogs.
  - Integrated API calls in the React components and managed client-side error feedback.
  - Developed the cookie consent banner on the Home page to comply with cookie usage policies.

- Zack
  - Managed the deployment process, including containerizing the backend using Docker.
  - Configured environment variables and set up the deployment on Render.
  - Coordinated testing across environments and contributed to overall project documentation and integration testing.

