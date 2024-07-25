
export interface IProjectConfigModel {
    projectKey: string;
    startDate: string;
    dueDate: string;
}

export interface IProjectConfigItemProps extends IProjectConfigModel{
    handleUpdate: (object: IProjectConfigModel) => void;
    handleRemove: (projectKey: string) => void;
}