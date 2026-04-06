import { RegisterInput } from '@repo/shared';
import { ConflictError } from '../../utils/AppError.js';
import { emailService } from '../mail/mail.service.js';
import { tokenService } from '../token/token.service.js';
import { userService } from '../user/user.service.js';

export const authService = {
  // ------ Register user -----------------------
  async registerUser(data: RegisterInput) {
    const { username, email, password } = data;

    const existingUser = await userService.findByEmailOrUsername(
      email,
      username,
    );
    if (existingUser) {
      if (existingUser.email === email) {
        throw new ConflictError('Email already exists.');
      }
      if (existingUser.username === username) {
        throw new ConflictError('Username already exists.');
      }
    }
    const user = await userService.createUser({
      username,
      email,
      passwordHash: password,
    });

    const { rawValue } = await tokenService.generateEmailVerificationToken(
      user.id,
    );

    await emailService.sendVerificationEmail(email, rawValue);
    return {
      message: 'Verification email sent successfully.',
    };
  },
};
