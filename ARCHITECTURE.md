# AIDE Simulation Architecture

This document describes the architecture and component interactions of the AIDE Simulation microservice.

## System Architecture

The AIDE Simulation service is designed as a microservice that communicates with the main AIDE Backend service via gRPC. It provides a RESTful API for client applications to interact with.

```
┌─────────────┐         ┌───────────────┐         ┌──────────────┐
│             │         │               │  gRPC   │              │
│  Client App │ ◄─────► │ AIDE Simulation│ ◄─────► │ AIDE Backend │
│             │   REST  │               │         │              │
└─────────────┘         └───────────────┘         └──────────────┘
                               ▲
                               │
                               ▼
                        ┌──────────────┐
                        │              │
                        │  PostgreSQL  │
                        │              │
                        └──────────────┘
                               ▲
                               │
                               ▼
                        ┌──────────────┐
                        │              │
                        │    Redis     │
                        │              │
                        └──────────────┘
```

## Component Interactions

### Module Structure

The application follows NestJS's modular architecture:

```
src/
├── config/                 # Configuration modules
│   ├── app.config.ts       # Application configuration
│   ├── database.config.ts  # Database configuration
│   ├── cache.config.ts     # Redis cache configuration
│   ├── grpc.config.ts      # gRPC configuration
│   ├── config.module.ts    # Configuration module
│   ├── database.module.ts  # Database module
│   └── cache.module.ts     # Cache module
│
├── common/                 # Shared utilities and helpers
│
├── interfaces/             # External service interfaces
│   └── grpc/               # gRPC client interfaces
│       ├── proto/          # Protocol buffer definitions
│       ├── aide-backend.interface.ts  # TypeScript interfaces for gRPC
│       └── grpc-client.module.ts      # gRPC client module
│
├── modules/                # Feature modules
│   ├── auth/               # Authentication module
│   │   ├── guards/         # Authentication guards
│   │   ├── strategies/     # Passport strategies
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   │
│   ├── simulation-sessions/  # Simulation sessions module
│   │   ├── dto/            # Data transfer objects
│   │   ├── entities/       # Database entities
│   │   ├── simulation-sessions.controller.ts
│   │   ├── simulation-sessions.service.ts
│   │   └── simulation-sessions.module.ts
│   │
│   ├── simulation-actions/   # Simulation actions module
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── simulation-actions.controller.ts
│   │   ├── simulation-actions.service.ts
│   │   └── simulation-actions.module.ts
│   │
│   └── simulation-feedbacks/ # Simulation feedbacks module
│       ├── dto/
│       ├── entities/
│       ├── simulation-feedbacks.controller.ts
│       ├── simulation-feedbacks.service.ts
│       └── simulation-feedbacks.module.ts
│
├── app.controller.ts       # Main application controller
├── app.service.ts          # Main application service
├── app.module.ts           # Main application module
└── main.ts                 # Application entry point
```

## Data Flow

### Simulation Session Flow

1. Client authenticates with the API using JWT
2. Client creates a new simulation session
3. Client adds simulation actions as the student progresses through the case
4. When the session is completed, the client requests feedback generation
5. The service generates feedback based on the student's actions

```
┌─────────┐         ┌──────────────┐         ┌───────────────┐         ┌───────────────┐
│         │         │              │         │               │         │               │
│ Client  │ ──────► │ Auth Module  │ ──────► │ Session Module│ ──────► │ Action Module │
│         │         │              │         │               │         │               │
└─────────┘         └──────────────┘         └───────────────┘         └───────────────┘
                                                                               │
                                                                               ▼
                                                                       ┌───────────────┐
                                                                       │               │
                                                                       │Feedback Module│
                                                                       │               │
                                                                       └───────────────┘
```

### Authentication Flow

1. Client sends user ID to authenticate
2. Service validates user ID with AIDE Backend via gRPC
3. Service generates JWT token and returns it to the client
4. Client uses JWT token for subsequent requests

### gRPC Communication

The service communicates with the AIDE Backend service to:
- Validate user information
- Get case information
- Validate correct answers for simulation actions

## Database Schema

The database schema consists of three main tables:

1. **simulation_sessions**: Stores information about simulation sessions
   - Linked to user and case in AIDE Backend
   - Tracks session status and scoring

2. **simulation_actions**: Stores actions taken during a simulation
   - Each action is linked to a session
   - Contains the student's input and correctness evaluation

3. **simulation_feedbacks**: Stores feedback for completed simulations
   - Each feedback is linked to a session
   - Contains AI-generated feedback text and structured evaluation

## Caching Strategy

Redis is used for caching:
- Session data to reduce database queries
- Case information from AIDE Backend
- Authentication tokens

## Security Considerations

- JWT authentication for API access
- Role-based access control
- Input validation using class-validator
- Environment-based configuration
- Secure communication with gRPC using TLS (in production) 