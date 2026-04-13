import { Types } from 'mongoose';

export const isValidObjectId = (id: string, message: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error(message);
  }
};
