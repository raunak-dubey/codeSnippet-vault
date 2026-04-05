import { Types } from 'mongoose';
import sessionModel, { SessionDocument } from './session.model.js';

type SessionMeta = {
  userAgent?: string;
};

export const sessionService = {
  async createSession(userId: string, meta: SessionMeta) {
    const ObjectId = new Types.ObjectId(userId);

    return sessionModel.createSession(ObjectId, meta);
  },

  async findByRefreshToken(rawToken: string): Promise<SessionDocument | null> {
    return sessionModel.findByRawToken(rawToken);
  },

  async revokeSession(session: SessionDocument) {
    return session.revoke();
  },

  async revokeAll(userId: string) {
    const ObjectId = new Types.ObjectId(userId);
    return sessionModel.revokeAll(ObjectId);
  },

  async getUserSessions(userId: string) {
    const ObjectId = new Types.ObjectId(userId);
    return sessionModel.getActiveSessions(ObjectId);
  },
};
