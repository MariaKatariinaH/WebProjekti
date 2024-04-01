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