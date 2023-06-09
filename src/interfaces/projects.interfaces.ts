type TProjects = {
  id: number;
  name: string;
  description: string;
  estimatedTime: string;
  repository: string;
  startedDate: Date;
  endDate?: Date;
  developerId: number;
};

type TProjectsRequest = Omit<TProjects, "id">;

export { TProjects, TProjectsRequest };
