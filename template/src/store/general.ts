import { Action, createSlice } from "@reduxjs/toolkit";

export interface GeneralState {
}

const initialState = {} as GeneralState;

interface ActionWithPayload<T> extends Action {
	payload: T | any;
}

export const general = createSlice({
	name: "general",
	initialState,
	reducers: {
		setTestValue() {

		}
	}
});

export const { setTestValue } = general.actions;

export default general.reducer;
