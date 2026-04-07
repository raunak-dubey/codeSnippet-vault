import { Types } from 'mongoose';
import userModel, { IUser } from './user.model.js';

export const userService = {
  async findByEmailOrUsername(email: string, username: string) {
    return userModel.findOne({
      $or: [{ email }, { username }],
    });
  },

  async findUserByEmail(email: string) {
    return await userModel.findOne({ email }).select('+passwordHash');
  },

  async createUser(data: Partial<IUser>) {
    return userModel.create(data);
  },

  async verifyEmail(userId: string) {
    return userModel.findByIdAndUpdate(
      new Types.ObjectId(userId),
      {
        isEmailVerified: true,
        emailVerifiedAt: new Date(),
      },
      { new: true },
    );
  },

  async findById(userId: string) {
    return userModel.findById(new Types.ObjectId(userId));
  },
};
