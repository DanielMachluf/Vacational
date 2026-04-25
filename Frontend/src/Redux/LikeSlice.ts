import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LikeReport = {
    destination: string;
    likesCount: number;
};

export type LikeState = {
    report: LikeReport[];
};

const initialState: LikeState = {
    report: []
};

// Populate reporting details for likes across vacations
function setReport(state: LikeState, action: PayloadAction<LikeReport[]>) {
    state.report = action.payload;
}

export const likeSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {
        setReport
    }
});

export const likeActions = likeSlice.actions;