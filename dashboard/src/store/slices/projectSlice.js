import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: [],
        loading: false,
        error: null,
        message: null,
        singleProject: {},
    },
    reducers: {
        getAllProjectsRequest(state, action) {
            state.projects = [];
            state.error = null;
            state.loading = true;
        },
        getAllProjectsSuccess(state, action) {
            state.projects = action.payload;
            state.error = null;
            state.loading = false;
        },
        getAllProjectsFailed(state, action) {
            state.projects = state.projects;
            state.error = action.payload;
            state.loading = false;
        },
        getProjectRequest(state, action) {
            state.singleProject = {};
            state.error = null;
            state.loading = true;
        },
        getProjectSuccess(state, action) {
            state.singleProject = action.payload;
            state.error = null;
            state.loading = false;
        },
        getProjectFailed(state, action) {
            state.singleProject = state.singleProject;
            state.error = action.payload;
            state.loading = false;
        },
        deleteProjectRequest(state, action) {
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        deleteProjectSuccess(state, action) {
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        deleteProjectFailed(state, action) {
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        addNewProjectRequest(state, action) {
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        addNewProjectSuccess(state, action) {
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        addNewProjectFailed(state, action) {
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        updateProjectRequest(state, action) {
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        updateProjectSuccess(state, action) {
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        updateProjectFailed(state, action) {
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        resetProjectSlice(state, action) {
            state.error = null;
            state.projects = state.projects;
            state.message = null;
            state.loading = false;
        },
        clearAllErrors(state, action) {
            state.error = null;
            state.projects = state.projects;
        },
    },
});

export const getAllProjects = () => async (dispatch) => {
    dispatch(projectSlice.actions.getAllProjectsRequest());
    try {
        const { data } = await axios.get(
            "http://localhost:4000/api/v1/project/getall",
            {
                withCredentials: true,
            }
        );
        dispatch(projectSlice.actions.getAllProjectsSuccess(data.projects));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            projectSlice.actions.getAllProjectsFailed(
                error.response.data.message
            )
        );
    }
};

export const getProject = (id) => async (dispatch) => {
    dispatch(projectSlice.actions.getProjectRequest());
    try {
        const { data } = await axios.get(
            `http://localhost:4000/api/v1/project/get/${id}`,
            { withCredentials: true }
        );
        dispatch(projectSlice.actions.getProjectSuccess(data.project));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            projectSlice.actions.getProjectFailed(error.response.data.message)
        );
    }
};

export const deleteProject = (id) => async (dispatch) => {
    dispatch(projectSlice.actions.deleteProjectRequest());
    try {
        const { data } = await axios.delete(
            `http://localhost:4000/api/v1/project/delete/${id}`,
            { withCredentials: true }
        );
        dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            projectSlice.actions.deleteProjectFailed(
                error.response.data.message
            )
        );
    }
};

export const addNewProject = (projectData) => async (dispatch) => {
    dispatch(projectSlice.actions.addNewProjectRequest());
    try {
        const { data } = await axios.post(
            `http://localhost:4000/api/v1/project/add`,
            projectData,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        dispatch(projectSlice.actions.addNewProjectSuccess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            projectSlice.actions.addNewProjectFailed(
                error.response.data.message
            )
        );
    }
};

export const updateProject = (projectData) => async (dispatch) => {
    dispatch(projectSlice.actions.updateProjectRequest());
    try {
        const { data } = await axios.put(
            `http://localhost:4000/api/v1/project/update/${id}`,
            projectData,
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }
        );
        dispatch(projectSlice.actions.updateProjectSuccess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            projectSlice.actions.updateProjectFailed(
                error.response.data.message
            )
        );
    }
};

export const clearAllProjectErrors = () => (dispatch) => {
    dispatch(projectSlice.actions.clearAllErrors());
};
export const resetProjectSlice = () => (dispatch) => {
    dispatch(projectSlice.actions.resetProjectSlice());
};

export default projectSlice.reducer;
