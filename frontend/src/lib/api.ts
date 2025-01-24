import {
  AllWorkspaceResponseType,
  AnalyticsResponseType,
  CreateWorkspaceResponseType,
  CreateWorkspaceType,
  CurrentUserResponseType,
  EditProjectPayloadType,
  EditWorkspaceType,
  LoginResponseType,
  loginType,
  registerType,
  WorkspaceByIdResponseType,
} from "@/types/api.type";
import API from "./axios-client";

export const loginMutationFn = async (
  data: loginType
): Promise<LoginResponseType> => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

export const registerMutationFn = async (data: registerType) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

export const logoutMutationFn = async () => {
  await API.post("/auth/logout");
};

export const getCurrentUserQueryFn =
  async (): Promise<CurrentUserResponseType> => {
    const response = await API.get(`/user/current`);
    return response.data;
  };

//********* WORKSPACE ****************
//************* */

export const createWorkspaceMutationFn = async (
  data: CreateWorkspaceType
): Promise<CreateWorkspaceResponseType> => {
  const response = await API.post("/workspace/create/new", data);
  return response.data;
};

export const editWorkspaceMutationFn = async ({
  workspaceId,
  data,
}: EditWorkspaceType): Promise<EditProjectPayloadType> => {
  const response = await API.put(`/workspace/update/${workspaceId}`, data);
  return response.data;
};

export const getWorkspaceByIdQueryFn = async (
  workspaceId: string
): Promise<WorkspaceByIdResponseType> => {
  const response = await API.get(`/workspace/${workspaceId}`);
  return response.data;
};

export const getAllWorkspacesUserIsMemberQueryFn =
  async (): Promise<AllWorkspaceResponseType> => {
    const response = await API.get(`/workspace/all`);
    return response.data;
  };

export const getWorkspaceAnalyticsQueryFn = async (
  workspaceId: string
): Promise<AnalyticsResponseType> => {
  const response = await API.get(`/workspace/analytics/${workspaceId}`);
  return response.data;
};

export const changeWorkspaceMemberRoleMutationFn = async () => {};

export const deleteWorkspaceMutationFn = async (
  workspaceId: string
): Promise<{ message: string; currentWorkspace: string }> => {
  const response = await API.delete(`/workspace/delete/${workspaceId}`);
  return response.data;
};

//*******MEMBER ****************

export const invitedUserJoinWorkspaceMutationFn = async () => {};

//********* */
//********* PROJECTS
export const createProjectMutationFn = async () => {};

export const editProjectMutationFn = async () => {};

export const getProjectsInWorkspaceQueryFn = async () => {};

export const getProjectByIdQueryFn = async () => {};

export const getProjectAnalyticsQueryFn = async () => {};

export const deleteProjectMutationFn = async () => {};

//*******TASKS ********************************
//************************* */

export const createTaskMutationFn = async () => {};

export const getAllTasksQueryFn = async () => {};

export const deleteTaskMutationFn = async () => {};
