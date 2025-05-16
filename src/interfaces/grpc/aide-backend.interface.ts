/**
 * Interface definitions for gRPC communication with aide-backend service
 */

// User service interfaces
export interface UserIdRequest {
  user_id: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Case service interfaces
export interface CaseIdRequest {
  case_id: string;
}

export interface CaseStep {
  id: string;
  type: string;
  description: string;
  correct_answers: string[];
  points: number;
}

export interface CaseResponse {
  id: string;
  title: string;
  description: string;
  steps: CaseStep[];
}

// Service interface definitions
export interface UserService {
  getUserById(data: UserIdRequest): Promise<UserResponse>;
}

export interface CaseService {
  getCaseById(data: CaseIdRequest): Promise<CaseResponse>;
} 