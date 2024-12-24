import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
    name: "skill",
    initialState: {
        loading: false,
        skills: [],
        error: null,
        message: null,
    },
    reducers: {
        getAllSkillsRequest(state, action) {
            state.skills = [];
            state.error = null;
            state.loading = true;
        },
        getAllSkillsSuccess(state, action) {
            state.skills = action.payload;
            state.error = null;
            state.loading = false;
        },
        getAllSkillsFailed(state, action) {
            state.skills = state.skills;
            state.error = action.payload;
            state.loading = false;
        },
        deleteSkillRequest(state, action) {
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        deleteSkillSuccess(state, action) {
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        deleteSkillFailed(state, action) {
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        addNewSkillRequest(state, action) {
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        addNewSkillSuccess(state, action) {
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        addNewSkillFailed(state, action) {
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        updateSkillRequest(state, action) {
            state.message = null;
            state.error = null;
            state.loading = true;
        },
        updateSkillSuccess(state, action) {
            state.message = action.payload;
            state.error = null;
            state.loading = false;
        },
        updateSkillFailed(state, action) {
            state.message = null;
            state.error = action.payload;
            state.loading = false;
        },
        resetSkillSlice(state, action) {
            state.error = null;
            state.skills = state.skills;
            state.message = null;
            state.loading = false;
        },
        clearAllErrors(state, action) {
            state.error = null;
            state.skills = state.skills;
        },
    },
});

export const getAllSkills = () => async (dispatch) => {
    dispatch(skillSlice.actions.getAllSkillsRequest());
    try {
        const { data } = await axios.get(
            "https://dev-portfolio-backend.onrender.com/api/v1/skill/getall",
            {
                withCredentials: true,
            }
        );
        dispatch(skillSlice.actions.getAllSkillsSuccess(data.skills));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            skillSlice.actions.getAllSkillsFailed(error.response.data.message)
        );
    }
};

export const deleteSkill = (id) => async (dispatch) => {
    dispatch(skillSlice.actions.deleteSkillRequest());
    try {
        const { data } = await axios.delete(
            `https://dev-portfolio-backend.onrender.com/api/v1/skill/delete/${id}`,
            { withCredentials: true }
        );
        dispatch(skillSlice.actions.deleteSkillSuccess(data.message));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            skillSlice.actions.deleteSkillFailed(error.response.data.message)
        );
    }
};

export const addNewSkill = (skillData) => async (dispatch) => {
    dispatch(skillSlice.actions.addNewSkillRequest());
    try {
        const { data } = await axios.post(
            `https://dev-portfolio-backend.onrender.com/api/v1/skill/add`,
            skillData,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        dispatch(skillSlice.actions.addNewSkillSuccess(data.message));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            skillSlice.actions.addNewSkillFailed(error.response.data.message)
        );
    }
};

export const updateSkill = (skillData) => async (dispatch) => {
    dispatch(skillSlice.actions.updateSkillRequest());
    try {
        const { data } = await axios.put(
            `https://dev-portfolio-backend.onrender.com/api/v1/skill/update/${id}`,
            skillData,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        dispatch(skillSlice.actions.updateSkillSuccess(data.message));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(
            skillSlice.actions.updateSkillFailed(error.response.data.message)
        );
    }
};

export const clearAllSkillErrors = () => (dispatch) => {
    dispatch(skillSlice.actions.clearAllErrors());
};
export const resetSkillSlice = () => (dispatch) => {
    dispatch(skillSlice.actions.resetSkillSlice());
};

export default skillSlice.reducer;
