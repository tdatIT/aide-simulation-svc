# AIDE Simulation API

A NestJS microservice for handling clinical case simulations and AI feedback.

## Features

- RESTful API for simulation sessions, actions, and feedbacks
- PostgreSQL database with TypeORM
- Redis cache for improved performance
- gRPC client for communication with aide-backend service
- JWT authentication and authorization
- Docker and Docker Compose support
- CI/CD with GitHub Actions

## Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)
- PostgreSQL (v14 or later)
- Redis (v7 or later)
- Docker and Docker Compose (optional)

## Installation

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/your-username/aide-simulation.git
cd aide-simulation
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Start PostgreSQL and Redis (or use Docker Compose):
```bash
npm run docker:up
```

5. Run the application:
```bash
npm run start:dev
```

### Docker Deployment

1. Build and run using Docker Compose:
```bash
docker-compose up -d
```

## API Documentation

When running in development mode, Swagger documentation is available at:
```
http://localhost:3000/api/docs
```

## Database Schema

The application uses the following database schema:

- **simulation_sessions**: Stores information about simulation sessions
- **simulation_actions**: Stores actions taken by students during simulations
- **simulation_feedbacks**: Stores AI-generated feedback for completed simulations

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login with user ID

### Simulation Sessions

- `GET /api/simulation-sessions` - Get all sessions
- `GET /api/simulation-sessions/my-sessions` - Get current user's sessions
- `GET /api/simulation-sessions/:id` - Get session by ID
- `POST /api/simulation-sessions` - Create a new session
- `PATCH /api/simulation-sessions/:id` - Update a session
- `DELETE /api/simulation-sessions/:id` - Delete a session

### Simulation Actions

- `GET /api/simulation-actions/by-session/:sessionId` - Get actions for a session
- `GET /api/simulation-actions/:id` - Get action by ID
- `POST /api/simulation-actions` - Create a new action
- `PATCH /api/simulation-actions/:id` - Update an action
- `DELETE /api/simulation-actions/:id` - Delete an action

### Simulation Feedbacks

- `GET /api/simulation-feedbacks/by-session/:sessionId` - Get feedback for a session
- `GET /api/simulation-feedbacks/:id` - Get feedback by ID
- `POST /api/simulation-feedbacks` - Create new feedback
- `PATCH /api/simulation-feedbacks/:id` - Update feedback
- `DELETE /api/simulation-feedbacks/:id` - Delete feedback

## Sample API Requests

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"userId": "550e8400-e29b-41d4-a716-446655440000"}'
```

### Create a Simulation Session

```bash
curl -X POST http://localhost:3000/api/simulation-sessions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "caseId": "7c0d7b61-8553-4b2d-b919-547721f4d4a5"
  }'
```

### Create a Simulation Action

```bash
curl -X POST http://localhost:3000/api/simulation-actions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "sessionId": "550e8400-e29b-41d4-a716-446655440000",
    "stepType": "ask",
    "inputValue": {
      "question": "What symptoms are you experiencing?"
    }
  }'
```

### Create Simulation Feedback

```bash
curl -X POST http://localhost:3000/api/simulation-feedbacks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "sessionId": "550e8400-e29b-41d4-a716-446655440000",
    "feedbackText": "You did a good job asking about symptoms, but missed some key diagnostic questions.",
    "checklistJson": {
      "history_taking": 8,
      "diagnosis": 7,
      "treatment": 6
    }
  }'
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
