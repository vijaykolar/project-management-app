import mongoose, { Document, Schema } from 'mongoose';
import { comparePassword, hashPassword } from '../utils/bcrypt';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  isActive: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
  currentWorkspace: mongoose.Types.ObjectId | null;
  comparePassword: (password: string) => Promise<boolean>;
  omitPassword(): Omit<UserDocument, 'password'>;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: true,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    currentWorkspace: {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
      default: null,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    if (this.password) {
      this.password = await hashPassword(this.password);
    }
  }
  next();
});

userSchema.methods.omitPassword = function (): Omit<UserDocument, 'password'> {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await comparePassword(password, this.password);
};

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
