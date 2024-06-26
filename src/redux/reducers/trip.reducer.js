import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const tripReducer = createReducer(initialState, (builder) => {
	builder
		.addCase("ASSIGN_TRIPS_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("ASSIGN_TRIPS_SUCCESS", (state) => {
			state.loading = false;
			state.message = "Trips Assign Successfully";
		})
		.addCase("ASSIGN_TRIPS_FAILURE", (state) => {
			state.loading = false;
			state.error = "Something went wrong! see logs for details";
		})
		.addCase("UPDATE_OFFROAD_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("UPDATE_OFFROAD_SUCCESS", (state, action) => {
			state.loading = false;
			state.message = action.payload;
		})
		.addCase("UPDATE_OFFROAD_FAILURE", (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase("COMPLETE_TRIPS_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("COMPLETE_TRIPS_SUCCESS", (state, action) => {
			state.loading = false;
			state.message = action.payload;
		})
		.addCase("COMPLETE_TRIPS_FAILURE", (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase("GET_ALL_TRIPS_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("GET_ALL_TRIPS_SUCCESS", (state, action) => {
			state.loading = false;
			// state.message = action.payload.message;
			state.trips = action.payload.trips;
		})
		.addCase("GET_ALL_TRIPS_FAILURE", (state, action) => {
			state.loading = false;
			// state.error = action.payload;
			state.trips = null;
		})
		.addCase("CLEAR_ERRORS", (state) => {
			state.error = null;
		})
		.addCase("CLEAR_MESSAGES", (state) => {
			state.message = null;
		});
});
