import { Types } from 'mongoose';
import Token, { TokenDocument, TokenType } from './token.model.js';

export const tokenService = {
  async generateEmailVerificationToken(userId: string) {
    const ObjectId = new Types.ObjectId(userId);
    return Token.generateToken(ObjectId, TokenType.EMAIL_VERIFICATION);
  },

  async findValidToken(
    rawToken: string,
    type: TokenType,
  ): Promise<TokenDocument | null> {
    const tokenDoc = await Token.findByRawValue(rawToken, type);

    if (!tokenDoc || !tokenDoc.isValid()) return null;
    return tokenDoc;
  },

  async markUsed(tokenDoc: TokenDocument) {
    await tokenDoc.markUsed();
  },
};
