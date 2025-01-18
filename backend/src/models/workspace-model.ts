import mongoose, { Document, model, Schema } from 'mongoose';
import { generateInviteCode } from '../utils/uuid';

export interface WorkspaceDocument extends Document {
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  inviteCode: string;
  createdAt: Date;
  updatedAt: Date;
}

const workspaceSchema = new Schema<WorkspaceDocument>(
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
      default: generateInviteCode,
      unique: true,
    },
  },
  { timestamps: true },
);

workspaceSchema.methods.resetInviteCode = function (this: WorkspaceDocument) {
  this.inviteCode = generateInviteCode();
};

export const WorkSpaceModel = model('Workspace', workspaceSchema);
