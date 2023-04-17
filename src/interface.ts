type TDeveloper = {
  id: number;
  name: string;
  email: string;
};

type TDeveloperRequest = Omit<TDeveloper, "id">;

type TDeveloperInfos = {
  id: number;
  developerSince: string;
  preferredOS: string;
  developerId: number;
};

type TDeveloperInfosRequest = Omit<TDeveloperInfos, "id">;

export {
  TDeveloper,
  TDeveloperRequest,
  TDeveloperInfos,
  TDeveloperInfosRequest,
};
