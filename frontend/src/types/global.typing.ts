export interface IActivity {
  id: string;
  name: string;
  description: string;
  activityType: string;
  status: string;
  statusTheme: string;
  tag: string;
  tagTheme: string;
  createdAt: string;
  updatedAt: string;
}
export interface ICreateActivityDto {
  name: string;
  description: string;
  activityType: string;
  status: string;
  statusTheme: string;
  tag: string;
  tagTheme: string;
}
export interface IMyTask {
  id: string;
  name: string;
  content: string;
  startDate: string;
  endDate: string;
  status: string;
  statusTheme: string;
  tag: string;
  tagTheme: string;
  activityId: string;
  activityName: string;
  createdAt:string;
  updatedAt:string;
}
export interface ICreateMyTaskDto {
  name: string;
  content: string;
  startDate: string;
  endDate: string;
  status: string;
  statusTheme: string;
  tag: string;
  tagTheme: string;
  activityId: string;
}
