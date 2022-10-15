import {Action, createSlice} from "@reduxjs/toolkit";
import {ProfileInfo} from "~/types/ProfileTypes";

export interface ProfileState {
    isLoggedIn: boolean | false,
    token: Nullable<string>,
    refreshToken: Nullable<string>,
    profile: Nullable<ProfileInfo>
}

interface LoginPayload {
    token: string;
    refreshToken: string;
}

const initialState = {
    isLoggedIn: false,
    token: null,
    refreshToken: null,
    profile: null
} as ProfileState;

interface ActionWithPayload<T> extends Action {
    payload: T | any;
}

export const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLoggedIn: (state: ProfileState, action: ActionWithPayload<LoginPayload>) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
        },
        userLoggedOut: (state: ProfileState) => {
            state.isLoggedIn = false;
            state.token = null;
            state.refreshToken = null;
            state.profile = null;
        },
        updateUserProfile: (state: ProfileState, action: ActionWithPayload<ProfileInfo>) => {
            state.profile = action.payload;
        }
    }
});

export const {userLoggedIn, userLoggedOut, updateUserProfile} = user.actions;

export default user.reducer;
