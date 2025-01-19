import 'dotenv/config';
import { startSession } from 'mongoose';
import { connectDB } from '../config/database-config';
import { RoleModel } from '../models/roles-permission-model';
import { RolePermissions } from './../utils/role-permission';

const seedRoles = async () => {
  console.log('Seeding roles');

  try {
    await connectDB();
    const session = await startSession();
    session.startTransaction();

    await RoleModel.deleteMany({}, { session });
    for (const roleName in RolePermissions) {
      const role = roleName as keyof typeof RolePermissions;
      const permissions = RolePermissions[role];

      const existingRole = await RoleModel.findOne({ name: role }).session(session);

      if (!existingRole) {
        const newRole = new RoleModel({
          name: role,
          permissions,
        });
        await newRole.save({ session });
        console.log(`Role ${role} added with permissions`);
      } else {
        console.log(`Role ${role} already exists`);
      }
    }

    await session.commitTransaction();
    console.log('Transaction committed');
    session.endSession();
    console.log('Session ended');
  } catch (error) {
    console.error('Error while seeding roles', error);
  }
};

seedRoles().catch((error) => console.error('Error running seed script', error));
