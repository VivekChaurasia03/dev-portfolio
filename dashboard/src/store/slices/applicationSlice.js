import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        loading: false,
        applications: [],
        error: null,
        message: null,
    },
    reducers: {
        getAllApplicationsRequest(state, action) {
            state.applications = [];
            state.error = null;
            state.loading = true;
        },
        getAllApplicationsSuccess(state, action) {
            state.applications = action.payload;
            state.error = null;
            state.loading = false;
        },
        getAllApplicationsFailed(state, action) {
            state.applications = state.applications;
            state.error = action.payload;
            state.loading = false;
        },
        deleteApplicationRequest(state, action) {
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        deleteApplicationSuccess(state, action) {
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        deleteApplicationFailed(state, action) {
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        addNewApplicationRequest(state, action) {
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        addNewApplicationSuccess(state, action) {
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        addNewApplicationFailed(state, action) {
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        resetApplicationSlice(state, action) {
            state.error = null;
            state.applications = state.applications;
            state.message = null;
            state.loading = false;
        },
        clearAllErrors(state, action) {
            state.error = null;
            state.applications = state.applications;
        },
    },
});

export const getAllApplications = () => async (dispatch) => {
    dispatch(applicationSlice.actions.getAllApplicationsRequest());
    try {
        const { data } = await axios.get(
            "http://localhost:4000/api/v1/application/getall",
            {
                withCredentials: true,
            }
        );
        dispatch(
            applicationSlice.actions.getAllApplicationsSuccess(
                data.softwareApplications
            )
        );
        dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            applicationSlice.actions.getAllApplicationsFailed(
                error.response.data.message
            )
        );
    }
};

export const deleteApplication = (id) => async (dispatch) => {
    dispatch(applicationSlice.actions.deleteApplicationRequest());
    try {
        const { data } = await axios.delete(
            `http://localhost:4000/api/v1/application/delete/${id}`,
            { withCredentials: true }
        );
        dispatch(
            applicationSlice.actions.deleteApplicationSuccess(data.message)
        );
        dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            applicationSlice.actions.deleteApplicationFailed(
                error.response.data.message
            )
        );
    }
};

export const addNewApplication = (applicationData) => async (dispatch) => {
    dispatch(applicationSlice.actions.addNewApplicationRequest());
    try {
        const { data } = await axios.post(
            `http://localhost:4000/api/v1/application/add`,
            applicationData,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        dispatch(
            applicationSlice.actions.addNewApplicationSuccess(data.message)
        );
        dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            applicationSlice.actions.addNewApplicationFailed(
                error.response.data.message
            )
        );
    }
};

export const clearAllApplicationErrors = () => (dispatch) => {
    dispatch(applicationSlice.actions.clearAllErrors());
};
export const resetApplicationSlice = () => (dispatch) => {
    dispatch(applicationSlice.actions.resetApplicationSlice());
};

export default applicationSlice.reducer;
