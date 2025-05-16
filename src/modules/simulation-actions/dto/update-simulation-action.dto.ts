import { IsBoolean, IsInt, IsOptional } from 'class-validator';

/**
 * DTO for updating a simulation action
 */
export class UpdateSimulationActionDto {
  /**
   * Whether the action was correct
   */
  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean;

  /**
   * Points awarded for this action
   */
  @IsOptional()
  @IsInt()
  point?: number;
} 