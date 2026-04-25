import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { userSlice } from "./UserSlice";
import { vacationSlice } from "./VacationSlice";
import { likeSlice } from "./LikeSlice";
import { filterSlice } from "./FilterSlice";

// Core redux setup mapped back directly to components
export const store = configureStore<AppState>({
    reducer: {
        user: userSlice.reducer,
        vacations: vacationSlice.reducer,
        likes: likeSlice.reducer,
        filter: filterSlice.reducer
    }
});