import { PermissionType } from "@/constant";
import { useAuthContext } from "@/context/auth-provider";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { Loader } from "lucide-react";
import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withPermission = (
  WrappedComponent: ComponentType,
  requiredPermission: PermissionType
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const WithPermission = (props: any) => {
    const { authLoading, hasPermission, user } = useAuthContext();
    const navigate = useNavigate();
    const workspaceId = useWorkspaceId();

    useEffect(() => {
      if (!user || !hasPermission(requiredPermission)) {
        navigate(`/workspace/${workspaceId}`);
      }
    }, [hasPermission, user, workspaceId, navigate]);

    if (authLoading) <Loader className="animate-spin h-5 w-5" />;

    if (!user || !hasPermission(requiredPermission)) return;

    return <WrappedComponent {...props} />;
  };
  return WithPermission;
};

export default withPermission;
