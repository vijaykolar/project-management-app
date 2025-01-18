import mongoose, { Document, model, Schema } from 'mongoose';
import { PermissionType, Roles, RoleType } from '../enums/role.enum';

export interface RolesPermissionDocument extends Document {
  name: RoleType;
  permissions: PermissionType[];
}

const rolesPermissionSchema = new Schema<RolesPermissionDocument>(
  {
    name: {
      type: String,
      enum: Object.values(Roles),
    },
    permissions: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const RolesPermissionModel = model('RolesPermission', rolesPermissionSchema);
