import { Schema, model, HydratedDocument, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { USERNAME_REGEX, EMAIL_REGEX } from '@repo/shared';

// ---- Constants ----------------------------------------
const SALT_ROUNDS = 12;

// ---- Types --------------------------------------------
export interface IUser {
  username: string;
  email: string;
  passwordHash: string;
  role: 'user' | 'admin';
  isEmailVerified: boolean;
  emailVerifiedAt?: Date;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, Record<string, never>, IUserMethods>;

export type UserDocument = HydratedDocument<IUser, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      trim: true,
      match: [
        USERNAME_REGEX,
        'Username must be 3-30 characters and only contain letters, numbers and underscores.',
      ],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      match: [EMAIL_REGEX, 'Email must be a valid email.'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
      index: true,
    },
    emailVerifiedAt: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false },
);

// ---- Indexes ------------------------------------------
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

// ---- Hooks --------------------------------------------
userSchema.pre('save', async function () {
  if (!this.isModified('passwordHash')) return;
  this.passwordHash = await bcrypt.hash(this.passwordHash, SALT_ROUNDS);
});

// ---- Methods ------------------------------------------
userSchema.methods.comparePassword = async function (
  this: UserDocument,
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash);
};

const userModel = model<IUser, UserModel>('User', userSchema);
export default userModel;
