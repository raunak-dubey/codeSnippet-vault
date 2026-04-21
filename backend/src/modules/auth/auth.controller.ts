import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authService } from './auth.service.js';
import {
  registerUserSchema,
  RegisterInput,
  loginUserSchema,
  LoginInput,
} from '@repo/shared';
import { env } from '../../config/env.js';
import { userService } from '../user/user.service.js';
import { UnauthorizedError } from '../../utils/AppError.js';
import { sessionService } from '../session/session.service.js';

export interface CookieRequest extends Request {
  cookies: {
    refreshToken?: string;
  };
}

// ------ Register user -----------------------
export const register = asyncHandler(async (req: Request, res: Response) => {
  const data: RegisterInput = registerUserSchema.parse(req.body);

  const result = await authService.registerUser(data);
  res.status(201).json({
    success: true,
    data: result,
  });
});

// ------ Verify email -----------------------
export const verifyEmail = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const token = req.query.token;

    if (!token || typeof token !== 'string') {
      return res.redirect(`${env.FRONTEND_URL}/login?error=invalid_token`);
    }

    try {
      await authService.verifyEmail(token);

      return res.redirect(`${env.FRONTEND_URL}/login?verified=true`);
    } catch {
      return res.redirect(
        `${env.FRONTEND_URL}/login?error=verification_failed`,
      );
    }
  },
);

// ------ Login user -----------------------
export const login = asyncHandler(async (req: Request, res: Response) => {
  const data: LoginInput = loginUserSchema.parse(req.body);

  const { accessToken, rawRefreshToken } = await authService.loginUser(data, {
    userAgent: req.headers['user-agent'],
  });

  res.cookie('refreshToken', rawRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/',
  });

  res.status(201).json({
    success: true,
    data: {
      accessToken,
    },
  });
});

// ------ Get user -----------------------
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) {
    throw new UnauthorizedError('Unauthorized');
  }

  const user = await userService.findById(req.userId);
  if (!user) throw new UnauthorizedError('Invalid Credentials.');

  res.status(200).json({
    success: true,
    data: user,
  });
});

// ------ Refresh token -----------------------
export const refresh = asyncHandler(
  async (req: CookieRequest, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedError('Unauthorized');
    }

    const { accessToken, rawRefreshToken } = await authService.refreshToken(
      refreshToken,
      {
        userAgent: req.headers['user-agent'],
      },
    );

    // set new refresh token cookie
    res.cookie('refreshToken', rawRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.status(200).json({
      success: true,
      data: {
        accessToken,
      },
    });
  },
);

// ------ Logout user -----------------------
export const logout = asyncHandler(
  async (req: CookieRequest, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedError('Unauthorized');
    }

    // revoke session
    const session = await sessionService.validateRefreshToken(refreshToken);
    if (session) await sessionService.revokeSession(session);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    res.status(200).json({
      success: true,
      message: 'Logged Out Successfully.',
    });
  },
);
