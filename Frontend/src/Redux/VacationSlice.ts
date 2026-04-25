import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VacationModel } from "../Models/VacationModel";

// Initialize the complete list of vacations
function initVacations(_currentState: VacationModel[], action: PayloadAction<VacationModel[]>): VacationModel[] {
    return action.payload;
}

// Add a newly created vacation into the state
function addVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const newState = [...currentState];
    newState.push(action.payload);
    return newState;
}

// Update the parameters of an existing vacation
function updateVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(v => v.vacationId === action.payload.vacationId);
    if (index !== -1) {
        newState[index] = action.payload;
    }
    return newState;
}

// Remove a vacation mapped by its ID
function deleteVacation(currentState: VacationModel[], action: PayloadAction<number>): VacationModel[] {
    return currentState.filter(v => v.vacationId !== action.payload);
}

// Toggle 'like' status locally mapping specific ID
function toggleLike(state: VacationModel[], action: PayloadAction<number>): void {
    const vacation = state.find(v => v.vacationId === action.payload);
    if (!vacation) return;

    const nextLiked = !vacation.isLiked;
    vacation.isLiked = nextLiked;
    vacation.likesCount = (vacation.likesCount || 0) + (nextLiked ? 1 : -1);
}

export const vacationSlice = createSlice({
    name: "vacations",
    initialState: [] as VacationModel[],
    reducers: {
        initVacations,
        addVacation,
        updateVacation,
        deleteVacation,
        toggleLike
    }
});

export const vacationActions = vacationSlice.actions;