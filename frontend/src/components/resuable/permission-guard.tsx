import { PermissionType } from "@/constant";
import { useAuthContext } from "@/context/auth-provider";
import { FC, ReactNode } from "react";

type PermissionsGuardProps = {
  requiredPermission: PermissionType;
  children: ReactNode;
  showMessage?: boolean;
};

const PermissionsGuard: FC<PermissionsGuardProps> = ({
  requiredPermission,
  children,
  showMessage = false,
}) => {
  const { hasPermission } = useAuthContext();
  if (!hasPermission(requiredPermission)) {
    return (
      showMessage && (
        <div className="text-center text-sm pt-3 italic w-full text-muted-foreground">
          You do not have the permission to invite a member.
        </div>
      )
    );
  }
  return <>{children}</>;
};

export default PermissionsGuard;
