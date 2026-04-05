import { ConflictError } from '../../utils/AppError.js';
import { emailService } from '../mail/mail.service.js';
import { tokenService } from '../token/token.service.js';
import { userService } from '../user/user.service.js';
import { RegisterUserDto } from './dto/registerUser.dto.js';

export const authService = {
  // ------ Register user -----------------------
  async registerUser(registerUserDto: RegisterUserDto) {
    const { username, email, passwordHash } = registerUserDto;

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
      passwordHash,
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
