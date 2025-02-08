import { useParams } from "react-router-dom";
import AnalyticsCard from "../common/analytics-card";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { useQuery } from "@tanstack/react-query";
import { getProjectAnalyticsQueryFn } from "@/lib/api";

const ProjectAnalytics = () => {
  const params = useParams();
  const projectId = params.projectId as string;

  const workspaceId = useWorkspaceId();

  const { data, isLoading } = useQuery({
    queryKey: ["project-analytics", projectId],
    queryFn: () => getProjectAnalyticsQueryFn({ workspaceId, projectId }),
    staleTime: 0,
    enabled: !!projectId,
  });

  const analyticsList = [
    {
      id: "total-task",
      title: "Total Task",
      value: data?.analytics.totalTasks,
    },
    {
      id: "overdue-task",
      title: "Overdue Task",
      value: data?.analytics.overdueTasks,
    },
    {
      id: "completed-task",
      title: "Completed Task",
      value: data?.analytics.completedTasks,
    },
  ];

  return (
    <div className="grid gap-4 md:gap-5 lg:grid-cols-2 xl:grid-cols-3">
      {analyticsList?.map((v) => (
        <AnalyticsCard
          title={v.title}
          value={v.value!}
          isLoading={isLoading}
          key={v.id}
        />
      ))}
    </div>
  );
};

export default ProjectAnalytics;
