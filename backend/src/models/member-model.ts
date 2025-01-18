import mongoose, { Document, model, Schema } from 'mongoose';

export interface MemberDocument extends Document {
  userId: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId;
  role: '';
  joinedAt: Date;
}

const memberSchema = new Schema<MemberDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // workspaceId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Workspace',
    //   required: true,
    // },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const MemberModel = model('Member', memberSchema);
