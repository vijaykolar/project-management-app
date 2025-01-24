import { createContext, useContext, useEffect } from "react";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useAuth from "@/hooks/api/use-auth";
import { UserType, WorkspaceType } from "@/types/api.type";
import useGetWorkspaceQuery from "@/hooks/api/use-get-workspace";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// Define the context shape
type AuthContextType = {
  workspaceId: string;
  user?: UserType;
  error?: Error;
  authLoading: boolean;
  workspaceLoading: boolean;
  isFetching: boolean;
  refetchAuth: () => void;
  workspace: WorkspaceType;
  refetchWorkspace: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //const navigate = useNavigate();
  const {
    data: authData,
    error: authError,
    isLoading: authLoading,
    isFetching: authFetching,
    refetch: refetchAuth,
  } = useAuth();

  const workspaceId = useWorkspaceId();
  const navigate = useNavigate();
  const user = authData?.user;

  const {
    data: workspaceData,
    isLoading: workspaceLoading,
    error: workspaceError,
    refetch: refetchWorkspace,
  } = useGetWorkspaceQuery(workspaceId);

  // console.log(data?.workspace, "data");

  useEffect(() => {
    if (workspaceError) {
      if (workspaceError.errorCode === "ACCESS_UNAUTHORIZED") {
        navigate("/");
      }
    }
  }, [workspaceError, navigate]);

  const workspace = workspaceData?.workspace;

  return (
    <AuthContext.Provider
      value={{
        workspaceId,
        user,
        error: authError! || workspaceError!,
        authLoading,
        workspaceLoading,
        isFetching: authFetching,
        refetchAuth,
        workspace: workspace!,
        refetchWorkspace,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useCurrentUserContext must be used within a AuthProvider");
  }
  return context;
};
