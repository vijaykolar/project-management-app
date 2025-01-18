import mongoose, { Document, model, Schema } from 'mongoose';
import { generateUniqueCode } from '../utils/uuid';

export interface WorkSpaceDocument extends Document {
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  inviteCode: string;
  createdAt: Date;
  updatedAt: Date;
}

const workSpaceSchema = new Schema<WorkSpaceDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    inviteCode: {
      type: String,
      required: true,
      default: generateUniqueCode,
      unique: true,
    },
  },
  { timestamps: true },
);

workSpaceSchema.methods.resetInviteCode = function (this: WorkSpaceDocument) {
  this.inviteCode = generateUniqueCode();
};

export const WorkSpaceModel = model('Workspace', workSpaceSchema);
