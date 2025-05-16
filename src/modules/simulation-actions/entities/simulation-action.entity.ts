import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SimulationSession } from '../../simulation-sessions/entities/simulation-session.entity';

/**
 * SimulationAction entity
 * Represents a student action during a simulation session
 */
@Entity('simulation_actions')
export class SimulationAction {
  /**
   * Primary key - UUID v4
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Reference to the simulation session
   */
  @ManyToOne(() => SimulationSession, (session) => session.actions)
  @JoinColumn({ name: 'session_id' })
  session: SimulationSession;

  /**
   * Session ID foreign key
   */
  @Column({ name: 'session_id', type: 'uuid' })
  sessionId: string;

  /**
   * Type of action step (ask, select_test, diagnosis, etc.)
   */
  @Column({ name: 'step_type', type: 'text' })
  stepType: string;

  /**
   * Input value provided by the student (stored as JSON)
   */
  @Column({ name: 'input_value', type: 'jsonb' })
  inputValue: Record<string, any>;

  /**
   * Whether the action was correct
   */
  @Column({ name: 'is_correct', type: 'boolean', nullable: true })
  isCorrect: boolean | null;

  /**
   * Points awarded for this action
   */
  @Column({ name: 'point', type: 'int', nullable: true })
  point: number | null;

  /**
   * Creation timestamp
   */
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
} 