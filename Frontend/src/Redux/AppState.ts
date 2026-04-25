import { UserModel } from "../Models/UserModel";
import { VacationModel } from "../Models/VacationModel";
import { FilterState } from "./FilterSlice";
import { LikeState } from "./LikeSlice";

export type AppState = {
    user: UserModel;
    vacations: VacationModel[];
    likes: LikeState;
    filter: FilterState;
};