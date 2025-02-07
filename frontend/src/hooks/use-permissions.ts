import { useEffect, useMemo, useState } from "react";
import { UserType, WorkspaceWithMembersType } from "@/types/api.type";
import { PermissionType } from "@/constant";

const usePermissions = (
  user: UserType | undefined,
  workspace: WorkspaceWithMembersType
) => {
  const [permissions, setPermissions] = useState<PermissionType[]>([]);
  useEffect(() => {
    if (user && workspace) {
      const member = workspace.members.find((mbr) => mbr?.userId === user._id);
      if (member) {
        setPermissions(member?.role?.permissions || []);
      }
    }
  }, [user, workspace]);
  return useMemo(() => {
    return { permissions };
  }, [permissions]);
};

export { usePermissions };
