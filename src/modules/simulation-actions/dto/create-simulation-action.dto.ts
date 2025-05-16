import { IsNotEmpty, IsObject, IsString, IsUUID } from 'class-validator';

/**
 * DTO for creating a new simulation action
 */
export class CreateSimulationActionDto {
  /**
   * Session ID the action belongs to
   */
  @IsUUID()
  @IsNotEmpty()
  sessionId: string;

  /**
   * Type of action step (ask, select_test, diagnosis, etc.)
   */
  @IsString()
  @IsNotEmpty()
  stepType: string;

  /**
   * Input value provided by the student
   */
  @IsObject()
  @IsNotEmpty()
  inputValue: Record<string, any>;
} 