import crypto from 'crypto';
import mongoose, { Schema, Model, HydratedDocument, Types } from 'mongoose';

// ─── Constants ──────────────────────────────────────────
const REFRESH_TOKEN_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

// ─── Interfaces ─────────────────────────────────────────
export interface ISession {
  userId: Types.ObjectId;
  refreshTokenHash: string;
  userAgent?: string;
  isActive: boolean;
  expiresAt: Date;
  createdAt: Date;
}

export interface ISessionMethods {
  revoke(): Promise<void>;
  isValid(): boolean;
}

export interface ISessionStatics extends Model<
  ISession,
  object,
  ISessionMethods
> {
  createSession(
    userId: Types.ObjectId,
    meta: { userAgent?: string },
  ): Promise<{ session: SessionDocument; rawRefreshToken: string }>;

  findByRawToken(rawToken: string): Promise<SessionDocument | null>;
  revokeAll(userId: Types.ObjectId): Promise<void>;
  getActiveSessions(userId: Types.ObjectId): Promise<SessionDocument[]>;
}

export type SessionDocument = HydratedDocument<ISession, ISessionMethods>;

// ─── Schema ─────────────────────────────────────────
const sessionSchema = new Schema<ISession, ISessionStatics, ISessionMethods>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required.'],
      index: true,
    },
    refreshTokenHash: {
      type: String,
      required: [true, 'Token is required.'],
      select: false,
    },
    userAgent: {
      type: String,
      trim: true,
      maxlength: 255,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  },
);

// ─── Indexs ─────────────────────────────────────────
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
sessionSchema.index({ userId: 1, isActive: 1 });
sessionSchema.index({ refreshTokenHash: 1 });

// ─── Methods ─────────────────────────────────────────
sessionSchema.methods.isValid = function (this: SessionDocument): boolean {
  return this.isActive && this.expiresAt.getTime() > Date.now();
};

sessionSchema.methods.revoke = async function (
  this: SessionDocument,
): Promise<void> {
  this.isActive = false;
  await this.save();
};

// ─── Statics ────────────────────────────────────────────
sessionSchema.statics.createSession = async function (
  this: ISessionStatics,
  userId: Types.ObjectId,
  meta: { userAgent?: string },
) {
  const rawRefreshToken = crypto.randomBytes(40).toString('hex');

  const refreshTokenHash = crypto
    .createHash('sha256')
    .update(rawRefreshToken)
    .digest('hex');

  const session = await this.create({
    userId,
    refreshTokenHash,
    userAgent: meta.userAgent,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS),
  });

  return { session, rawRefreshToken };
};

sessionSchema.statics.findByRawToken = function (
  this: ISessionStatics,
  rawToken: string,
) {
  const refreshTokenHash = crypto
    .createHash('sha256')
    .update(rawToken)
    .digest('hex');

  return this.findOne({ refreshTokenHash, isActive: true }).select(
    '+refreshTokenHash',
  );
};

sessionSchema.statics.revokeAll = async function (
  this: ISessionStatics,
  userId: Types.ObjectId,
) {
  await this.updateMany(
    { userId, isActive: true },
    { $set: { isActive: false } },
  );
};

sessionSchema.statics.getActiveSessions = function (
  this: ISessionStatics,
  userId: Types.ObjectId,
) {
  return this.find({ userId, isActive: true })
    .sort({ createdAt: -1 })
    .select('-refreshTokenHash');
};

// ─── Model ──────────────────────────────────────────────
const sessionModel = mongoose.model<ISession, ISessionStatics>(
  'Session',
  sessionSchema,
);
export default sessionModel;
