import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * Authentication controller
 * Handles authentication endpoints
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login endpoint
   * @param body Request body containing user ID
   * @returns JWT token and user information
   */
  @Post('login')
  async login(@Body() body: { userId: string }) {
    return this.authService.login(body.userId);
  }
} 