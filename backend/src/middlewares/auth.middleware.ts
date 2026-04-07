import { NextFunction, Request, Response } from 'express';
import { tokenService } from '../modules/token/token.service.js';
import { UnauthorizedError } from '../utils/AppError.js';

export interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
    return;
  }

  try {
    const decoded = tokenService.verifyAccessToken(token);

    if (!decoded.sub) {
      throw new UnauthorizedError('Invalid token.');
    }

    req.userId = decoded.sub;
    next();
  } catch {
    res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
};

export default authMiddleware;
