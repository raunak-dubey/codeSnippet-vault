import { LoginInput, RegisterInput } from '@repo/shared';
import { ConflictError, UnauthorizedError } from '../../utils/AppError.js';
import { emailService } from '../mail/mail.service.js';
import { tokenService } from '../token/token.service.js';
import { userService } from '../user/user.service.js';
import { sessionService } from '../session/session.service.js';
import { TokenType } from '../token/token.model.js';

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
      user._id,
    );

    await emailService.sendVerificationEmail(email, rawValue);
    return {
      message: 'Verification email sent successfully.',
    };
  },

  // ------ Verify email -----------------------
  async verifyEmail(token: string) {
    const tokenDoc = await tokenService.findValidToken(
      token,
      TokenType.EMAIL_VERIFICATION,
    );

    if (!tokenDoc) throw new UnauthorizedError('Invalid or expired token.');

    const user = await userService.findById(tokenDoc.userId.toString());
    if (!user) throw new UnauthorizedError('Invalid Credentials.');

    if (user.isEmailVerified) {
      return { message: 'Email already verified.' };
    }

    user.isEmailVerified = true;
    user.emailVerifiedAt = new Date();
    await user.save();

    await tokenService.markUsed(tokenDoc);

    return {
      message: 'Email verified successfully.',
    };
  },

  // ------ Login user -----------------------
  async loginUser(data: LoginInput, meta: { userAgent?: string }) {
    const { email, password } = data;

    const user = await userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedError('Invalid Credentials.');

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new UnauthorizedError('Invalid Credentials.');

    if (!user.isEmailVerified) {
      throw new UnauthorizedError('Please verify your email first.');
    }

    const { rawRefreshToken } = await sessionService.createSession(
      user._id,
      meta,
    );
    const accessToken = tokenService.generateAccessToken(user._id);

    return {
      accessToken,
      rawRefreshToken,
    };
  },

  // ------ Refresh token -----------------------
  async refreshToken(rawToken: string, meta: { userAgent?: string }) {
    const { session, rawRefreshToken } =
      await sessionService.rotateRefreshToken(rawToken, meta);

    const accessToken = tokenService.generateAccessToken(session.userId);

    return {
      accessToken,
      rawRefreshToken,
    };
  },
};
