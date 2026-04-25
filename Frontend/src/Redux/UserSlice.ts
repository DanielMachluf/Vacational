import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";

// Initialize the user model in the global state
function initUser(_currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    return action.payload;
}

// Log out the user by clearing state details
function logoutUser(_currentState: UserModel, _action: Action): UserModel {
    return null!;
}

export const userSlice = createSlice({
    name: "user",
    initialState: null! as UserModel,
    reducers: { initUser, logoutUser }
});

export const userActions = userSlice.actions;