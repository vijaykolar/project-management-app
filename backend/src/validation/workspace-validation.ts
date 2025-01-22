import { z } from 'zod';

const nameSchema = z
  .string()
  .trim()
  .min(1, {
    message: 'Name is required',
  })
  .max(255);

const descriptionSchema = z
  .string()
  .trim()
  .min(3, {
    message: 'Description must be at least 3 characters',
  })
  .max(255);

export const createWorkspaceSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
});

export const updateWorkspaceSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
});

export const workspaceIdSchema = z.string().trim().min(1, {
  message: 'Workspace ID is required',
});

export const changeRoleSchema = z.object({
  memberId: z.string().trim().min(1),
  roleId: z.string().trim().min(1),
});
