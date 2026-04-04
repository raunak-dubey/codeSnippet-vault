import { Schema, model, Document, HydratedDocument } from 'mongoose';
import bcrypt from 'bcryptjs';
import { USERNAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from '@repo/shared';

// ---- Constants ----------------------------------------
const SALT_ROUNDS = 12;

// ---- Types --------------------------------------------
export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  role: 'user' | 'admin';
  isEmailVerified: boolean;
  emailVerifiedAt?: Date;
}

export type UserDocument = HydratedDocument<IUser> & {
  comparePassword(password: string): Promise<boolean>;
};

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Username is required.'],
      trim: true,
      lowercase: true,
      match: [
        USERNAME_REGEX,
        'Username must be 3-30 characters and only contain letters, numbers and underscores.',
      ],
    },
    email: {
      type: String,
      unique: true,
      index: true,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      match: [EMAIL_REGEX, 'Email must be a valid email.'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.'],
      select: false,
      match: [
        PASSWORD_REGEX,
        'Password must be at least 8 characters, one uppercase, one lowercase, one number and one special character.',
      ],
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
userSchema.pre<IUser>('save', async function () {
  const user = this as UserDocument;
  if (!user.isModified('passwordHash')) return;

  this.passwordHash = await bcrypt.hash(this.passwordHash, SALT_ROUNDS);
});

// ---- Methods ------------------------------------------
userSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(password, user.passwordHash);
};

const userModel = model<IUser>('User', userSchema);
export default userModel;
