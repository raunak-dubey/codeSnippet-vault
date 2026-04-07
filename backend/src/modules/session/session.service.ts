import { Types } from 'mongoose';
import sessionModel, { SessionDocument } from './session.model.js';
import { UnauthorizedError } from '../../utils/AppError.js';

type SessionMeta = {
  userAgent?: string;
};

export const sessionService = {
  async createSession(userId: Types.ObjectId, meta: SessionMeta) {
    return sessionModel.createSession(userId, meta);
  },

  async findByRefreshToken(rawToken: string): Promise<SessionDocument | null> {
    return sessionModel.findByRawToken(rawToken);
  },

  async revokeSession(session: SessionDocument) {
    return session.revoke();
  },

  async revokeAll(userId: Types.ObjectId) {
    return sessionModel.revokeAll(userId);
  },

  async getUserSessions(userId: Types.ObjectId) {
    return sessionModel.getActiveSessions(userId);
  },

  async validateRefreshToken(rawToken: string): Promise<SessionDocument> {
    const session = await sessionModel.findByRawToken(rawToken);

    if (!session || !session.isValid()) {
      throw new UnauthorizedError('Session expired. Please log in again.');
    }

    return session;
  },

  // ? Revoke old sessions and issues new one.
  async rotateRefreshToken(
    rawToken: string,
    meta: SessionMeta,
  ): Promise<{ rawRefreshToken: string; session: SessionDocument }> {
    const oldSession = await this.validateRefreshToken(rawToken);

    await oldSession.revoke();

    return sessionModel.createSession(oldSession.userId, meta);
  },
};
