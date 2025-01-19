import mongoose, { Document, model, Schema } from 'mongoose';
import { Permissions, PermissionType, Roles, RoleType } from '../enums/role.enum';
import { RolePermissions } from '../utils/role-permission';

export interface RolesDocument extends Document {
  name: RoleType;
  permissions: PermissionType[];
}

const rolesPermissionSchema = new Schema<RolesDocument>(
  {
    name: {
      type: String,
      enum: Object.values(Roles),
      unique: true,
      required: true,
    },
    permissions: {
      type: [String],
      enum: Object.values(Permissions),
      required: true,
      default: function (this: RolesDocument) {
        return RolePermissions[this.name];
      },
    },
  },
  {
    timestamps: true,
  },
);

export const RoleModel = model('RolesPermission', rolesPermissionSchema);
