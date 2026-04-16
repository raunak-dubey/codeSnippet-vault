import { Response } from 'express';

export const sendRes = <T>(res: Response, data: T, status = 200): void => {
  res.status(status).json({ success: true, data });
};
