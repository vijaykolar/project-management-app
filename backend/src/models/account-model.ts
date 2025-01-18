import mongoose, { Document, Schema } from 'mongoose';
import { ProviderEnum, ProviderEnumType } from '../enums/account-provider.enum';

export interface AccountDocument extends Document {
  provider: ProviderEnumType;
  providerId: string;
  userId: mongoose.Types.ObjectId;
  refreshToken: string | null;
  tokenExpiry: Date | null;
  createdAt: Date;
}

const accountSchema = new Schema<AccountDocument>(
  {
    provider: {
      type: String,
      required: true,
      enum: Object.values(ProviderEnum),
    },
    providerId: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    tokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        delete ret.refreshToken;
      },
    },
  },
);

export const AccountModel = mongoose.model('Account', accountSchema);
