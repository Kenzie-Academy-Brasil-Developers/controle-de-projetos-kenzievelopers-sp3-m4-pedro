type TDeveloper = {
  id: number;
  name: string;
  email: string;
};

type TDeveloperInfos = {
  id: number;
  developerSince: string;
  preferredOS: string;
  developerId: number;
};

type TDeveloperRequest = Omit<TDeveloper, "id">;

type TDeveloperInfosRequest = Omit<TDeveloperInfos, "id">;

export {
  TDeveloper,
  TDeveloperRequest,
  TDeveloperInfos,
  TDeveloperInfosRequest,
};
