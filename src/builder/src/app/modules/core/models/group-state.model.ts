export interface GroupStateModel {
    opened: boolean;
}

export interface GroupsStateModel {
    [key: string]: GroupStateModel;
}
