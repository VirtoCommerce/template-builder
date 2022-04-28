import { Dictionary } from './dictionary.model';

export interface GroupStateModel {
    opened: boolean;
}

export type GroupsStateModel = Dictionary<GroupStateModel>;
